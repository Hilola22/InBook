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
  ParseIntPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/signin-user.dto";
import { Response, Request } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CookieGetter } from "../common/decorators/cookie-getter.decorators";

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
  signoutUser(
    @CookieGetter("refreshToken") refreshToken: string, //2 usul
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutUser(refreshToken, res);
  }
  @ApiOperation({ summary: "Foydalanuvchi tokenini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi tokeni yangilandi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post(":id/refresh")
  refreshUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshUser(id, refreshToken, res);
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
  signoutAdmin(
    @CookieGetter("refresh_token_admin") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signoutAdmin(refreshToken, res);
  }

  @ApiOperation({ summary: "Admin tokenini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin tokeni yangilandi ✅",
  })
  @HttpCode(HttpStatus.OK)
  @Post(":id/refresh-admin")
  refreshAdmin(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token_admin") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshAdmin(id, refreshToken, res);
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
