import { Module } from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { LanguagesController } from "./languages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Language } from "./models/language.model";
import { JwtModule } from "@nestjs/jwt";
import { BookVersionModule } from "../book-version/book-version.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Language]),
    JwtModule.register({}),
    BookVersionModule,
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
