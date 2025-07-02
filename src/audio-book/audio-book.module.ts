import { forwardRef, Module } from "@nestjs/common";
import { AudioBookService } from "./audio-book.service";
import { AudioBookController } from "./audio-book.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AudioBook } from "./models/audio-book.model";
import { BookVersion } from "../book-version/models/book-version.model";
import { Book } from "../books/models/book.model";
import { JwtModule } from "@nestjs/jwt";
import { BookVersionModule } from "../book-version/book-version.module";
import { AudioPartsModule } from "src/audio-parts/audio-parts.module";

@Module({
  imports: [
    SequelizeModule.forFeature([AudioBook, BookVersion, Book]),
    JwtModule.register({}),
    BookVersionModule,
    forwardRef(() => AudioPartsModule),
  ],
  controllers: [AudioBookController],
  providers: [AudioBookService],
  exports: [AudioBookService],
})
export class AudioBookModule {}
