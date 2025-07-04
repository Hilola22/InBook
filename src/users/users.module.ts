import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { BotModule } from "../bot/bot.module";
import { Otp } from "./models/otp.model";
import { CollectionModule } from "../collection/collection.module";
import { BookMarkModule } from "src/book-marks/book-mark.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    JwtModule.register({}),
    BotModule,
    forwardRef(() => CollectionModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
