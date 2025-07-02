import { forwardRef, Module } from "@nestjs/common";
import { AudioPartsService } from "./audio-parts.service";
import { AudioPartsController } from "./audio-parts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AudioPart } from "./models/audio-part.model";
import { JwtModule } from "@nestjs/jwt";
import { AudioBookModule } from "src/audio-book/audio-book.module";
import { AudioBook } from "src/audio-book/models/audio-book.model";

@Module({
  imports: [
    SequelizeModule.forFeature([AudioPart, AudioBook]),
    JwtModule.register({}),
    forwardRef(() => AudioBookModule),
  ],
  controllers: [AudioPartsController],
  providers: [AudioPartsService],
  exports: [AudioPartsService],
})
export class AudioPartsModule {}
