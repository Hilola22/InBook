import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { UserGuard } from "../common/guards/user.guard";
import { UserSelfGuard } from "../common/guards/user-self.guard";
import { UserIsPremiumGuard } from "../common/guards/user-is_premium.guard";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto2";

@ApiTags("Foydalanuvchilar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi foydalanuvchi qo'shildi ✅",
    type: User,
  })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @HttpCode(200)
  @Post("new-otp")
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(200)
  @Post("verify-otp")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilar: ",
    type: [User],
  })
  @UseGuards(UserGuard, UserIsPremiumGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini email orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi: ",
    type: User,
  })
  @UseGuards(UserGuard)
  @Get("email")
  findUserByEmail(@Query("email") email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi: ",
    type: User,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi ma'lumotlari yangilandi ✅",
    type: User,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchi ma'lumotlarini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi ma'lumotlari o'chirildi ✅",
  })
  // @UseGuards(UserSelfGuard)
  // @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: "Foydalanuvchi hisobini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi hisobi faollashtirildi ✅",
  })
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }
}
