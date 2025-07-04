import { Module } from "@nestjs/common";
import { BookCollectionService } from "./book-collection.service";
import { BookCollectionController } from "./book-collection.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookCollection } from "./models/book-collection.model";
import { Book } from "../books/models/book.model";
import { Collection } from "../collection/models/collection.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([BookCollection, Book, Collection]),
    JwtModule.register({}),
  ],
  controllers: [BookCollectionController],
  providers: [BookCollectionService],
  exports: [BookCollectionService],
})
export class BookCollectionModule {}
