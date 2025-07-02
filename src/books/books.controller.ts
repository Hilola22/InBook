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
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Book } from "./models/book.model";

@ApiTags("Kitoblar")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: "Yangi kitob qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi kitob qo'shildi!",
    type: Book,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: "Barcha kitoblar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha kitoblar:",
    type: [Book],
  })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: "Kitobni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kitob:",
    type: Book,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: "Kitobni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kitob yangilandi!",
    type: Book,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: "Kitobni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kitob o'chirildi!",
    type: Book,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
