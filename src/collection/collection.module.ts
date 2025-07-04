import { forwardRef, Module } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CollectionController } from "./collection.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Collection } from "./models/collection.model";
import { BookCollectionModule } from "../book-collection/book-collection.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Collection]),
    BookCollectionModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
