import { Module } from "@nestjs/common";
import { SubscribtionService } from "./subscribtion.service";
import { SubscribtionController } from "./subscribtion.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Subscribtion } from "./models/subscribtion.model";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Subscribtion]), UsersModule],
  controllers: [SubscribtionController],
  providers: [SubscribtionService],
  exports: [SubscribtionService],
})
export class SubscribtionModule {}
