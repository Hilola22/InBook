import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookMark } from "./models/book-mark.model";
import { Book } from "src/books/models/book.model";
import { User } from "src/users/models/user.model";
import { BookMarksService } from "./book-marks.service";
import { BookMarkController } from "./book-mark.controller";
import { UsersModule } from "src/users/users.module";
import { BooksModule } from "src/books/books.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([BookMark, Book, User]),
    JwtModule.register({})
  ],
  controllers: [BookMarkController],
  providers: [BookMarksService],
  exports: [BookMarksService],
})
export class BookMarkModule {}
