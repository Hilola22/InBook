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
import { AudioPartsService } from "./audio-parts.service";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AudioPart } from "./models/audio-part.model";
import { AdminIsCreatorGuard } from "src/common/guards/admin-is_creator.guard";
import { AdminJwtGuard } from "src/common/guards/admin.guard";

@ApiTags("Audio bo'limlar")
@Controller("audio-parts")
export class AudioPartsController {
  constructor(private readonly audioPartsService: AudioPartsService) {}

  @ApiOperation({ summary: "Yangi audio bo'lim qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi audio bo'lim qo'shildi",
    type: AudioPart,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Post()
  create(@Body() createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartsService.create(createAudioPartDto);
  }

  @ApiOperation({ summary: "Barcha audio bo'limlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha audio bo'limlar ro'yxati",
    type: [AudioPart],
  })
  @Get()
  findAll() {
    return this.audioPartsService.findAll();
  }

  @ApiOperation({ summary: "Audio bo'limini ID bo'yicha topish" })
  @ApiResponse({
    status: 200,
    description: "Audio bo'limi",
    type: AudioPart,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.audioPartsService.findOne(id);
  }

  @ApiOperation({ summary: "Audio bo'limini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Audio bo'limi yangilandi",
    type: AudioPart,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAudioPartDto: UpdateAudioPartDto
  ) {
    return this.audioPartsService.update(id, updateAudioPartDto);
  }

  @ApiOperation({ summary: "Audio bo'limini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Audio bo'limi o'chirildi",
    type: AudioPart,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.audioPartsService.remove(id);
  }
}
