import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/signin-user.dto";
import { Response, Request } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Autentifikatsiya")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Foydalanuvchi ro'yxatdan o'tish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi ro'yxatdan o'tdi ✅",
  })
  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchi tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi tizimga kirdi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    //express --> Response
    return this.authService.signin(signInUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchi tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi tizimdan chiqdi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  signoutUser(@Res({ passthrough: true }) res: Response) {
    return this.authService.signoutUser(res);
  }

  @ApiOperation({ summary: "Foydalanuvchi tokenini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi tokeni yangilandi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  refreshUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;
    return this.authService.refreshUser(refresh_token, res);
  }

  @ApiOperation({ summary: "Foydalanuvchi hisobini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi hisobi faollashtirildi ✅",
  })
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.authService.activateUser(link);
  }

  @ApiOperation({ summary: "Admin ro'yxatdan o'tish" })
  @ApiResponse({
    status: 201,
    description: "Admin ro'yxatdan o'tdi ✅",
  })
  @Post("signup-admin")
  signupAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signupAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Admin tizimga kirdi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin-admin")
  signinAdmin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinAmdin(signinAdminDto, res);
  }

  @ApiOperation({ summary: "Admin tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Admin tizimdan chiqdi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("signout-admin")
  signoutAdmin(@Res({ passthrough: true }) res: Response) {
    return this.authService.signoutAdmin(res);
  }

  @ApiOperation({ summary: "Admin tokenini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin tokeni yangilandi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh-admin")
  refreshAdmin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;
    return this.authService.refreshAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: "Admin hisobini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Admin hisobi faollashtirildi ✅",
  })
  @Get("activate-admin/:link")
  activateAdmin(@Param("link") link: string) {
    return this.authService.activateAdmin(link);
  }
}
