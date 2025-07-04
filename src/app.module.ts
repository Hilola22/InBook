import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { GenreModule } from "./genre/genre.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from "./bot/bot.module";
import { CategoriesModule } from "./categories/categories.module";
import { Genre } from "./genre/models/genre.model";
import { Categories } from "./categories/models/category.model";
import { AuthorsModule } from "./authors/authors.module";
import { Authors } from "./authors/models/author.model";
import { LanguagesModule } from "./languages/languages.module";
import { Language } from "./languages/models/language.model";
import { BooksModule } from "./books/books.module";
import { BookVersionModule } from "./book-version/book-version.module";
import { BookVersion } from "./book-version/models/book-version.model";
import { AudioBookModule } from "./audio-book/audio-book.module";
import { AudioPartsModule } from "./audio-parts/audio-parts.module";
import { AudioBook } from "./audio-book/models/audio-book.model";
import { AudioPart } from "./audio-parts/models/audio-part.model";
import { Book } from "./books/models/book.model";
import { Bot } from "./bot/models/bot.model";
import { Library } from "./bot/library/model/library.model";
import { CollectionModule } from './collection/collection.module';
import { Collection } from "./collection/models/collection.model";
import { BookCollectionModule } from './book-collection/book-collection.module';
import { BookCollection } from "./book-collection/models/book-collection.model";
import { BookMarkModule } from './book-marks/book-mark.module';
import { BookMark } from "./book-marks/models/book-mark.model";
import { SubscribtionModule } from './subscribtion/subscribtion.module';
import { Subscribtion } from "./subscribtion/models/subscribtion.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),

    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Admin,
        Genre,
        Categories,
        Authors,
        Language,
        Book,
        BookVersion,
        AudioBook,
        AudioPart,
        Bot,
        Library,
        Collection,
        BookCollection,
        BookMark,
        Subscribtion
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    GenreModule,
    BotModule,
    CategoriesModule,
    AuthorsModule,
    LanguagesModule,
    BooksModule,
    BookVersionModule,
    AudioBookModule,
    AudioPartsModule,
    CollectionModule,
    BookCollectionModule,
    BookMarkModule,
    SubscribtionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
