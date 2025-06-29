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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";

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
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilar: ",
    type: [User],
  })
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
