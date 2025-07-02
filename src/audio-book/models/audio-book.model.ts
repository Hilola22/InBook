import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { BookVersion } from "../../book-version/models/book-version.model";
import { AudioPart } from "src/audio-parts/models/audio-part.model";

interface IAudioBookCreationAttr {
  book_version_id: number;
  narrator_name: string;
  total_duration: number;
  total_size_mb: number;
}
@Table({ tableName: "audio-book" })
export class AudioBook extends Model<AudioBook, IAudioBookCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Audio kitobning unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Ovoz muallifi ism-familyasi",
  })
  @Column({
    type: DataType.STRING(80),
  })
  declare narrator_name: string;

  @ApiProperty({
    example: 15,
    description: "Audio davomiyligi (min)",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare total_duration: number;

  @ApiProperty({
    example: 220,
    description: "Audio hajmi (MB)",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare total_size_mb: number;

  @ApiProperty({
    example: 1,
    description: "Kitob versiyasi Idsi",
  })
  @ForeignKey(() => BookVersion)
  @Column({
    type: DataType.INTEGER,
  })
  declare book_version_id: number;

  @BelongsTo(() => BookVersion)
  book_version: BookVersion;

  @HasMany(() => AudioPart)
  audio_parts: AudioPart[];
}
