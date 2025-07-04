import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { InjectBot } from "nestjs-telegraf";
import { Library } from "./library/model/library.model";
import { Op } from "sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Library) private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}
  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, akkauntini faollashtirish uchun <b>☎️ Telfon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️ Telfon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else if (!user.status) {
        await ctx.replyWithHTML(
          `Iltimos, akkauntini faollashtirish uchun <b>☎️ Telfon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️ Telfon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else {
        await this.bot.telegram.sendChatAction(user.user_id, "typing");
        await ctx.replyWithHTML(
          `Ushbu BOT InBook Premium foydalnuvchilar uchun kitob izlash imkoniyatini beradi!📚`,
          {
            ...Markup.keyboard(["📚 Kutubxona", "📗 Kitob"]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Start():`, error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(
            `Iltimos, akkauntini faollashtirish uchun <b>/start</b> tugmasini bosing`,
            {
              ...Markup.keyboard(["/start"]).resize(),
            }
          );
        } else if (ctx.message.contact.user_id != user_id) {
          await ctx.replyWithHTML(
            `Iltimos, o'zingizni telefon raqamingizni yuboring!`,
            {
              ...Markup.keyboard([
                [Markup.button.contactRequest("☎️ Telfon raqamni yuborish")],
              ]).resize(),
            }
          );
        } else {
          let phone = ctx.message.contact.phone_number;
          user.phone_number = phone[0] != "+" ? "+" + phone : phone;
          user.status = true;
          await user.save();

          await ctx.replyWithHTML(`Tabriklayman!🎉 Akkaunt faollashtirildi!`, {
            ...Markup.removeKeyboard(),
          });
        }
      }
    } catch (error) {
      console.log(`Error on Contact():`, error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz!`, {
          ...Markup.removeKeyboard(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();

        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqib ketdingiz! Qayta faollashtirish uchun <b>/start</b> tugmasini bosing`,
          {
            ...Markup.keyboard(["/start"]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Stop():`, error);
    }
  }

  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }

      await this.bot.telegram.sendMessage(user.user_id, `Verify code: ${OTP}`);

      return true;
    } catch (error) {
      console.log(`Error on sendOtp(): `, error);
    }
  }

  async onText(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(
          `Iltimos, akkauntini faollashtirish uchun <b>/start</b> tugmasini bosing`,
          {
            ...Markup.keyboard(["/start"]).resize(),
          }
        );
      } else {
        if ("text" in ctx.message!) {
          const library = await this.libraryModel.findOne({
            where: { user_id, last_state: { [Op.ne]: "finish" } },
            order: [["id", "DESC"]],
          });

          if (library) {
            const userInputText = ctx.message.text;
            switch (library.last_state) {
              case "name":
                ((library.name = userInputText),
                  (library.last_state = "address"));
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini kiriting:");
                break;
              case "address":
                ((library.address = userInputText),
                  (library.last_state = "location"));
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini kiriting:", {
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("Manzil tanlang")],
                  ]).resize(),
                });
                break;
              case "location":
                ((library.location = userInputText),
                  (library.last_state = "phone_number"));
                await library.save();
                await ctx.replyWithHTML("Kutubxona lakatsiyasini kiriting:", {
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("Manzil tanlang")],
                  ]).resize(),
                });
                break;
              case "phone_number":
                ((library.phone_number = userInputText),
                  (library.last_state = "finish"));
                await library.save();
                await ctx.replyWithHTML("Yangi kutubxona qo'shildi!:", {
                  ...Markup.keyboard([
                    ["Yangi kutubxona qo'shish", "Barcha kutubxonalar"],
                  ]).resize(),
                });
                break;
            }
          }
        }
      }
    } catch (error) {
      console.log(`Error on Text(): `, error);
    }
  }

  async onLocation(ctx: Context) {
    try {
      if ("location" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(
            `Iltimos, akkauntini faollashtirish uchun <b>/start</b> tugmasini bosing`,
            {
              ...Markup.keyboard(["/start"]).resize(),
            }
          );
        } else {
          const library = await this.libraryModel.findOne({
            where: { user_id, last_state: { [Op.ne]: "location" } },
            order: [["id", "DESC"]],
          });
          if (library) {
            library.location =
              ctx.message.location.latitude +
              "|" +
              ctx.message.location.longitude;
            library.last_state = "phone_number";
            await library.save();
            await ctx.replyWithHTML(
              "Kutubxona telefonini kiriting(masalan, 991234567)",
              {
                ...Markup.removeKeyboard(),
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(`Error on Location(): `, error);
    }
  }
}
