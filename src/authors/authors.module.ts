import { forwardRef, Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { AuthorsController } from "./authors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Authors } from "./models/author.model";
import { JwtModule } from "@nestjs/jwt";
import { BooksModule } from "../books/books.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Authors]),
    JwtModule.register({}),
    forwardRef(() => BooksModule),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
