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
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Language } from "./models/language.model";
import { AdminIsCreatorGuard } from "../common/guards/admin-is_creator.guard";
import { AdminJwtGuard } from "../common/guards/admin.guard";

@ApiTags("Tillar")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiOperation({ summary: "Yangi til qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi til qo'shildi!",
    type: Language,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @ApiOperation({ summary: "Barcha tillar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha tillar:",
    type: [Language],
  })
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @ApiOperation({ summary: "Tilni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Til:",
    type: Language,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.languagesService.findOne(id);
  }

  @ApiOperation({ summary: "Tilni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Til yangilandi!",
    type: Language,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(id, updateLanguageDto);
  }

  @ApiOperation({ summary: "Tilni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Til o'chirildi!",
    type: Language,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.languagesService.remove(id);
  }
}
