import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SignInUserDto } from "../users/dto/signin-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";
import { Admin } from "../admin/models/admin.model";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly mailService: MailService
  ) {}

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("This user already exists!");
    }
    const newUser = await this.usersService.create(createUserDto);
    //emailni tekshirish shart emas bo'lgan loyihalarda, shu zahoti token beriladi va kirishga ruxsat beriladi
    //sendMail -->>
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Error sending message!");
    }
    return {
      message:
        "You're registered! Confirm your email to activate your account!",
    };
  }

  async signin(signInUserDto: SignInUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      signInUserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        "Email yoki parol noto'g'ri (validPassword) "
      );
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.refreshToken = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { message: "User signed in", id: user.id, accessToken };
  }

  // async signoutUser(refreshToken: string, res: Response) {
  //   res.clearCookie("refresh_token");
  //   return { message: "User signed out successfully" };
  // }

  async signoutUser(refreshToken: string, res: Response) {
    let userData: any;
    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refreshToken");
    return { message: "User logged out successfully" };
  }

  async refreshUser(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);
    console.log(userId);
    console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);

    if (!user || !user.refreshToken) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.refreshToken
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, refresh_token);
    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    const response = {
      message: "User refreshed!",
      userId: user.id,
      accessToken: accessToken,
    };

    return response;
  }

  async activateUser(activationLink: string) {
    const user =
      await this.usersService.findUserByActivationLink(activationLink);
    if (!user) {
      throw new BadRequestException("Invalid activation link");
    }

    if (user.is_active) {
      throw new BadRequestException("User is already activated");
    }

    user.is_active = true;
    await user.save();

    return { message: "User activated successfully" };
  }

  //-----------------------------ADMIN uchun-------------------------------------//
  private async generateTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
        expiresIn: process.env.ACCESS_TOKEN_TIME_ADMIN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
        expiresIn: process.env.REFRESH_TOKEN_TIME_ADMIN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signupAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("This admin already exists!");
    }
    const newAdmin = await this.adminService.create(createAdminDto);

    try {
      await this.mailService.sendMailAdmin(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Error sending message!");
    }

    return {
      message:
        "You're registered! Confirm your email to activate your account!",
    };
  }

  async signinAmdin(signinAdminDto: SigninAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signinAdminDto.email
    );
    if (!admin) {
      throw new UnauthorizedException("Password or email incorrect ❌");
    }

    const validPassword = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );
    if (!validPassword) {
      throw new UnauthorizedException(
        "Invalid password ❌. Please check you password"
      );
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);
    admin.refreshToken = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refresh_token_admin", refreshToken, {
      maxAge: +process.env.COOKIE_TIME_ADMIN!,
      httpOnly: true,
    });
    return { message: "Admin signed in!", id: admin.id, accessToken };
  }

  async signoutAdmin(refreshToken: string, res: Response) {
    let adminData: any;
    try {
      adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!adminData) {
      throw new ForbiddenException("Admin not verified");
    }

    await this.usersService.updateRefreshToken(adminData.id, "");

    res.clearCookie("refresh_token_admin");
    return { message: "Admin logged out successfully" };
  }

  async refreshAdmin(
    adminId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);
    console.log(adminId);
    console.log(decodedToken["id"]);
    const adminOne = await this.adminService.findOne(adminId);

    if (adminId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    if (!adminOne || !adminOne.refreshToken) {
      throw new NotFoundException("admin not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      adminOne.refreshToken
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } =
      await this.generateTokensAdmin(adminOne);

    const refresh_token_admin = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshTokenAdmin(
      adminOne.id,
      refresh_token_admin
    );
    res.cookie("refresh_token_admin", refreshToken, {
      maxAge: +process.env.COOKIE_TIME_ADMIN!,
      httpOnly: true,
    });
    const response = {
      message: "Admin refreshed!",
      adminId: adminOne.id,
      accessToken: accessToken,
    };

    return response;
  }

  async activateAdmin(activationLink: string) {
    const admin =
      await this.adminService.findAdminByActivationLink(activationLink);
    if (!admin) {
      throw new BadRequestException("Invalid activation link");
    }

    if (admin.is_active) {
      throw new BadRequestException("Admin is already activated");
    }

    admin.is_active = true;
    await admin.save();

    return { message: "Admin activated successfully" };
  }
}
