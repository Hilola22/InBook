import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }
  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx)
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 2].file_id)
  //     );
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.reply(String(ctx.message.voice.duration));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithDocument(String(ctx.message.document.file_id));
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Hey there!👋🏻");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Ertaga yordam beraman!👋🏻");
  // }

  // @Command("inline")
  // async onInline(@Ctx() ctx: Context) {
  //   const inlineKeyBoards = [
  //     [
  //       { text: "Product1", callback_data: "product_1" },
  //       { text: "Product2", callback_data: "product_2" },
  //       { text: "Product3", callback_data: "product_3" },
  //     ],
  //     [
  //       { text: "Product4", callback_data: "product_4" },
  //       { text: "Product5", callback_data: "product_5" },
  //     ],
  //     [{ text: "Product6", callback_data: "product_6" }],
  //   ];

  //   await ctx.reply("Kerakli productni tanlang: ", {
  //     reply_markup: { inline_keyboard: inlineKeyBoards },
  //   });
  // }

  // @Action("product_1")
  // async onActPro1(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Product1 tanlandi!");
  // }

  // @Action(/product_\d+/)
  // async onActAnyroduct(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const data = ctx.callbackQuery?.data;
  //     const productId = data.split("_")[1];
  //     await ctx.replyWithHTML(`${productId} - product tanlandi!`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Kerakli main buttonni tanlang: ", {
  //     ...Markup.keyboard([
  //       ["Bir"],
  //       ["Ikki", "Uch"],
  //       ["To'rt", "Besh", "Olti"],
  //       [Markup.button.contactRequest("Telefon raqamingizni yuboring!")],
  //       [Markup.button.locationRequest("Joylashuvingizni yuboring!")],
  //     ])
  //       .resize()
  //       .oneTime(),
  //   });
  // }

  // @Hears("Bir")
  // async onHearsBir(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Bir tanlandi!");
  // }

  // @Hears("Ikki")
  // async onHearsIkki(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Ikki tanlandi!");
  // }

  // @Hears("Uch")
  // async onHearsUch(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Uch tanlandi!");
  // }

  // @Hears("To'rt")
  // async onHearsTort(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("To'rt tanlandi!");
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   if ("text" in ctx.message!) {
  //     if (ctx.message.text == "hi") {
  //       ctx.replyWithHTML(`<b>Hello</b>`);
  //     } else {
  //       ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }
}
