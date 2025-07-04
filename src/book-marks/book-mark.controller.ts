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
import { BookMarksService } from "./book-marks.service";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookMark } from "./models/book-mark.model";
import { UserGuard } from "src/common/guards/user.guard";
import { UserSelfGuard } from "src/common/guards/user-self.guard";

@ApiTags("Kitob sahifasini belgilagich")
@Controller("book-marks")
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarksService) {}

  @ApiOperation({ summary: "Yangi bookmark yaratish" })
  @ApiResponse({
    status: 201,
    description: "Bookmark yaratildi!",
    type: BookMark,
  })
  @UseGuards(UserGuard, UserSelfGuard)
  @Post()
  create(@Body() dto: CreateBookMarkDto) {
    return this.bookMarkService.create(dto);
  }

  @ApiOperation({ summary: "Barcha bookmarklarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha bookmarklar",
    type: [BookMark],
  })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.bookMarkService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha bookmark olish" })
  @ApiResponse({ status: 200, description: "Bookmark topildi", type: BookMark })
  @UseGuards(UserGuard, UserSelfGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bookMarkService.findOne(id);
  }

  @ApiOperation({ summary: "Bookmarkni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Bookmark yangilandi",
    type: BookMark,
  })
  @UseGuards(UserGuard, UserSelfGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBookMarkDto
  ) {
    return this.bookMarkService.update(id, dto);
  }

  @ApiOperation({ summary: "Bookmarkni o'chirish" })
  @ApiResponse({ status: 200, description: "Bookmark o'chirildi!" })
  @UseGuards(UserGuard, UserSelfGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bookMarkService.remove(id);
  }
}
