import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Genre]), JwtModule.register({})],
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService]
})
export class GenreModule {}
