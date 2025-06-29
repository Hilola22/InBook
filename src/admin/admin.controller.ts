import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@ApiTags("Adminlar")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Yangi admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi admin qo'shildi ✅",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Barcha adminlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar: ",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini email orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin: ",
    type: Admin,
  })
  @Get("email")
  findAdminByEmail(@Query("email") email: string) {
    return this.adminService.findAdminByEmail(email);
  }

  @ApiOperation({ summary: "Admin akkountini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Admin akkounti faollashtirildi ✅",
  })
  @Get("activate/:link")
  activateAdmin(@Param("link") link: string) {
    return this.adminService.activateAdmin(link);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin: ",
    type: Admin,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari yangilandi ✅",
    type: Admin,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update({ id: id, updateAdminDto });
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari o'chirildi ✅",
    type: Admin,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }
}
