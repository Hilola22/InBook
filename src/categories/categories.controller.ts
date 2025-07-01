import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Categories } from "./models/category.model";
import { AdminJwtGuard } from "../common/guards/admin.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { UserGuard } from "../common/guards/user.guard";
import { UserSelfGuard } from "../common/guards/user-self.guard";
import { AdminIsCreatorGuard } from "../common/guards/admin-is_creator.guard";

@ApiTags("Kategoriyalar")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Yangi kategoriya qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi kategoriya qo'shildi!",
    type: Categories,
  })
  @UseGuards(AdminJwtGuard, AdminSelfGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "Barcha kategoriyalar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha kategoriyalar:",
    type: [Categories],
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: "Kategoriyani Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya:",
    type: Categories,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: "Kategoriyani Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya yangilandi!",
    type: Categories,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Kategoriyani Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya o'chirildi!",
    type: Categories,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
