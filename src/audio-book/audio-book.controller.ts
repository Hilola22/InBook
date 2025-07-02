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
import { AudioBookService } from "./audio-book.service";
import { CreateAudioBookDto } from "./dto/create-audio-book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio-book.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AudioBook } from "./models/audio-book.model";
import { AdminJwtGuard } from "../common/guards/admin.guard";
import { AdminIsCreatorGuard } from "../common/guards/admin-is_creator.guard";

@ApiTags("Audio kitoblar")
@Controller("audio-book")
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @ApiOperation({ summary: "Yangi audio kitob qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi audio kitob qo'shildi!",
    type: AudioBook,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Post()
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @ApiOperation({ summary: "Barcha audio kitoblar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha audio kitoblar:",
    type: [AudioBook],
  })
  @Get()
  findAll() {
    return this.audioBookService.findAll();
  }

  @ApiOperation({ summary: "Audio kitobni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Audio kitob:",
    type: AudioBook,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.audioBookService.findOne(id);
  }

  @ApiOperation({ summary: "Audio kitobni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Audio kitob yangilandi!",
    type: AudioBook,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAudioBookDto: UpdateAudioBookDto
  ) {
    return this.audioBookService.update(id, updateAudioBookDto);
  }

  @ApiOperation({ summary: "Audio kitobni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Audio kitob o'chirildi!",
    type: AudioBook,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.audioBookService.remove(id);
  }
}
