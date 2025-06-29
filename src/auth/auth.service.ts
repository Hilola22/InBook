import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
  BadRequestException,
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

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { message: "User signed in", id: user.id, accessToken };
  }

  async signoutUser(res: Response) {
    res.clearCookie("refresh_token");
    return { message: "User signed out successfully" };
  }

  async refreshUser(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.usersService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokens = await this.generateTokens(user);
    user.refreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tokens refreshed", accessToken: tokens.accessToken };
  }

  async activateUser(activationLink: string) {
    const user = await this.usersService.findUserByActivationLink(activationLink);
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

    res.cookie("refresh_token", refreshToken, {
      maxAge: +process.env.COOKIE_TIME_ADMIN!,
      httpOnly: true,
    });
    return { message: "Admin signed in!", id: admin.id, accessToken };
  }

  async signoutAdmin(res: Response) {
    res.clearCookie("refresh_token");
    return { message: "Admin signed out successfully" };
  }

  async refreshAdmin(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
      });
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      admin.refreshToken
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokens = await this.generateTokensAdmin(admin);
    admin.refreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME_ADMIN!,
      httpOnly: true,
    });

    return {
      message: "Admin tokens refreshed",
      accessToken: tokens.accessToken,
    };
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
