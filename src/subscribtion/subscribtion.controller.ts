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
import { SubscribtionService } from "./subscribtion.service";
import { CreateSubscribtionDto } from "./dto/create-subscribtion.dto";
import { UpdateSubscribtionDto } from "./dto/update-subscribtion.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Subscribtion } from "./models/subscribtion.model";

@ApiTags("Obuna")
@Controller("subscribtion")
export class SubscribtionController {
  constructor(private readonly subscribtionService: SubscribtionService) {}

  @ApiOperation({ summary: "Yangi obuna qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi obuna qo'shildi!",
    type: Subscribtion,
  })
  @Post()
  create(@Body() createSubscribtionDto: CreateSubscribtionDto) {
    return this.subscribtionService.create(createSubscribtionDto);
  }

  @ApiOperation({ summary: "Barcha obunalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha obunalar",
    type: [Subscribtion],
  })
  @Get()
  findAll() {
    return this.subscribtionService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha obuna olish" })
  @ApiResponse({
    status: 200,
    description: "Obuna topildi",
    type: Subscribtion,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.subscribtionService.findOne(id);
  }

  @ApiOperation({ summary: "Obunani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Obuna yangilandi",
    type: Subscribtion,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSubscribtionDto: UpdateSubscribtionDto
  ) {
    return this.subscribtionService.update(id, updateSubscribtionDto);
  }

  @ApiOperation({ summary: "Obunani o'chirish" })
  @ApiResponse({ status: 200, description: "Obuna o'chirildi!" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.subscribtionService.remove(id);
  }
}
