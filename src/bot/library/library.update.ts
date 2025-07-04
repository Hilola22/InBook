import { Context, Markup } from "telegraf";
import { BotService } from "../bot.service";
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { LibraryService } from "./library.service";

@Update()
export class LibraryUpdate {
  constructor(private readonly libraryService: LibraryService) {}

  @Hears("📚 Kutubxona")
  async onHearslibrary(@Ctx() ctx: Context){
    await this.libraryService.onLibrary(ctx)
  }

  @Hears("Yangi kutubxona qo'shish")
  async onNewLibrary(@Ctx() ctx: Context){
    await this.libraryService.addNewLibrary(ctx)
  }
}
