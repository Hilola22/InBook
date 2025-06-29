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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    //express --> Response
    return this.authService.signin(signInUserDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signout")
  signoutUser(@Res({ passthrough: true }) res: Response) {
    return this.authService.signoutUser(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  refreshUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;
    return this.authService.refreshUser(refresh_token, res);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.authService.activateUser(link);
  }

  @Post("signup-admin")
  signupAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signupAdmin(createAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin-admin")
  signinAdmin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signinAmdin(signinAdminDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signout-admin")
  signoutAdmin(@Res({ passthrough: true }) res: Response) {
    return this.authService.signoutAdmin(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh-admin")
  refreshAdmin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refresh_token } = req.cookies;
    return this.authService.refreshAdmin(refresh_token, res);
  }

  @Get("activate-admin/:link")
  activateAdmin(@Param("link") link: string) {
    return this.authService.activateAdmin(link);
  }
}
