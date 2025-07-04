import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { Library } from "./library/model/library.model";
import { LibraryService } from "./library/library.service";
import { LibraryUpdate } from "./library/library.update";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Library])],
  controllers: [],
  providers: [BotService, LibraryService, LibraryUpdate, BotUpdate], //botupdate eng oxirida
  exports: [BotService],
})
export class BotModule {}
