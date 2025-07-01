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
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Authors } from "./models/author.model";
import { AdminJwtGuard } from "../common/guards/admin.guard";
import { AdminIsCreatorGuard } from "../common/guards/admin-is_creator.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";

@ApiTags("Mualliflar")
@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: "Yangi muallif qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi muallif qo'shildi!",
    type: Authors,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: "Barcha mualliflar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mualliflar:",
    type: [Authors],
  })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: "Muallifni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Muallif:",
    type: Authors,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: "Muallifni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Muallif yangilandi!",
    type: Authors,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: "Muallifni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Muallif o'chirildi!",
    type: Authors,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.authorsService.remove(id);
  }
}
