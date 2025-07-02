import { forwardRef, Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthorsModule } from "../authors/authors.module";
import { Authors } from "../authors/models/author.model";
import { BookVersionModule } from "../book-version/book-version.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Book, Authors]),
    JwtModule.register({}),
    forwardRef(() => AuthorsModule),
    BookVersionModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, SequelizeModule],
})
export class BooksModule {}
