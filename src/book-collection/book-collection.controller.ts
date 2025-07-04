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
import { BookCollectionService } from "./book-collection.service";
import { CreateBookCollectionDto } from "./dto/create-book-collection.dto";
import { UpdateBookCollectionDto } from "./dto/update-book-collection.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookCollection } from "./models/book-collection.model";
import { UserGuard } from "src/common/guards/user.guard";
import { UserSelfGuard } from "src/common/guards/user-self.guard";

@ApiTags("Book-Collection")
@Controller("book-collection")
export class BookCollectionController {
  constructor(private readonly bookCollectionService: BookCollectionService) {}

  @ApiOperation({ summary: "Yangi book-collection yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi book-collection yaratildi!",
    type: BookCollection,
  })
  @UseGuards(UserGuard, UserSelfGuard)
  @Post()
  create(@Body() createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookCollectionService.create(createBookCollectionDto);
  }

  @ApiOperation({ summary: "Barcha book-collectionlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha book-collectionlar",
    type: [BookCollection],
  })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.bookCollectionService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha book-collection olish" })
  @ApiResponse({
    status: 200,
    description: "Book-collection topildi",
    type: BookCollection,
  })
  @UseGuards(UserGuard, UserSelfGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bookCollectionService.findOne(id);
  }

  @ApiOperation({ summary: "Book-collectionni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Book-collection yangilandi",
    type: BookCollection,
  })
  @UseGuards(UserGuard, UserSelfGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBookCollectionDto: UpdateBookCollectionDto
  ) {
    return this.bookCollectionService.update(id, updateBookCollectionDto);
  }

  @ApiOperation({ summary: "Book-collectionni o'chirish" })
  @ApiResponse({ status: 200, description: "Book-collection o'chirildi!" })
  @UseGuards(UserGuard, UserSelfGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bookCollectionService.remove(id);
  }
}
