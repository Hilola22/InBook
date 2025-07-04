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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { Collection } from "./models/collection.model";

@ApiTags("Kolleksiyalar")
@Controller("collections")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: "Yangi kolleksiya yaratish" })
  @ApiResponse({
    status: 201,
    type: Collection,
    description: "Yangi kolleksiya muvaffaqiyatli yaratildi",
  })
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @ApiOperation({ summary: "Barcha kolleksiyalarni olish" })
  @ApiResponse({
    status: 200,
    type: [Collection],
    description: "Barcha kolleksiyalar ro'yxati",
  })
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @ApiOperation({ summary: "Kolleksiyani ID orqali olish" })
  @ApiResponse({
    status: 200,
    type: Collection,
    description: "Tanlangan kolleksiya ma'lumotlari",
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.collectionService.findOne(id);
  }

  @ApiOperation({ summary: "Kolleksiyani yangilash" })
  @ApiResponse({
    status: 200,
    type: Collection,
    description: "Kolleksiya muvaffaqiyatli yangilandi",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionService.update(id, updateCollectionDto);
  }

  @ApiOperation({ summary: "Kolleksiyani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kolleksiya muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.collectionService.remove(id);
  }
}
