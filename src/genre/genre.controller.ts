import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './models/genre.model';
import { AdminJwtGuard } from '../common/guards/admin.guard';
import { AdminIsCreatorGuard } from '../common/guards/admin-is_creator.guard';

@ApiTags("Janrlar")
@Controller("genre")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: "Yangi janr qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi janr qo'shildi!",
    type: Genre,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiOperation({ summary: "Barcha janrlar ro'yxatini olish " })
  @ApiResponse({
    status: 200,
    description: "Barcha janrlar: ",
    type: [Genre],
  })
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @ApiOperation({ summary: "Janrni Id orqali olish " })
  @ApiResponse({
    status: 200,
    description: "Janr: ",
    type: Genre,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  @ApiOperation({ summary: "Janrni Id orqali yangilash " })
  @ApiResponse({
    status: 200,
    description: "Janr yangilandi! ",
    type: Genre,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @ApiOperation({ summary: "Janrni Id orqali o'chirish " })
  @ApiResponse({
    status: 200,
    description: "Janr o'chirildi!",
    type: Genre,
  })
  @UseGuards(AdminJwtGuard, AdminIsCreatorGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
