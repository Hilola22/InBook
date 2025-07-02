import { Module } from "@nestjs/common";
import { BookVersionService } from "./book-version.service";
import { BookVersionController } from "./book-version.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookVersion } from "./models/book-version.model";
import { Book } from "../books/models/book.model";
import { Language } from "../languages/models/language.model";

@Module({
  imports: [SequelizeModule.forFeature([BookVersion, Book, Language])],
  controllers: [BookVersionController],
  providers: [BookVersionService],
  exports: [BookVersionService],
})
export class BookVersionModule {}

