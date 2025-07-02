import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { BookVersionService } from "./book-version.service";
import { CreateBookVersionDto } from "./dto/create-book-version.dto";
import { UpdateBookVersionDto } from "./dto/update-book-version.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Kitob versiyasi")
@Controller("book-version")
export class BookVersionController {
  constructor(private readonly bookVersionService: BookVersionService) {}

  @ApiOperation({ summary: "Yangi kitob versiyasini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kitob versiyasi muvaffaqiyatli yaratildi.",
  })
  @Post()
  create(@Body() createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionService.create(createBookVersionDto);
  }

  @ApiOperation({ summary: "Barcha kitob versiyalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha kitob versiyalari qaytariladi.",
  })
  @Get()
  findAll() {
    return this.bookVersionService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha kitob versiyasini olish" })
  @ApiResponse({
    status: 200,
    description: "Ko'rsatilgan IDga ega kitob versiyasini qaytaradi.",
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bookVersionService.findOne(id);
  }

  @ApiOperation({ summary: "ID bo'yicha kitob versiyasini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi muvaffaqiyatli yangilandi.",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookVersionDto: UpdateBookVersionDto
  ) {
    return this.bookVersionService.update(id, updateBookVersionDto);
  }

  @ApiOperation({ summary: "ID bo'yicha kitob versiyasini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi muvaffaqiyatli o'chirildi.",
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bookVersionService.remove(id);
  }
}
