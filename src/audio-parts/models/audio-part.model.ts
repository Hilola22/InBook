import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AudioBook } from "src/audio-book/models/audio-book.model";

interface IAudioPartCreationAttr{
    audio_book_id: number;
    title: string;
    file_url: string;
    duration: number;
    size_mb: number;
    order_index: number;
}

@Table({ tableName: "audio-parts" })
export class AudioPart extends Model<AudioPart, IAudioPartCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kitob bo'limining unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "O'tgan kunlar 1 bo'lim",
    description: "Kitob bo'limining sarlavhasi",
  })
  @Column({
    type: DataType.STRING
  })
  declare title: string;

  @ApiProperty({
    example: "https://example.com/audio-part-1.mp3",
    description: "Kitob bo'limining audio fayli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare file_url: string;

  @ApiProperty({
    example: 15,
    description: "Kitob bo'limining davomiyligi (min)",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare duration: number;

  @ApiProperty({
    example: 220,
    description: "Kitob bo'limining hajmi (MB)",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare size_mb: number;

  @ApiProperty({
    example: 1,
    description: "Kitob bo'limining tartib raqami",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare order_index: number;

  @ApiProperty({
    example: 1,
    description: "Kitob bo'limining audio kitobining Idsi",
  })
  @ForeignKey(() => AudioBook)
  @Column({
    type: DataType.INTEGER,
  })
  declare audio_book_id: number;

  @BelongsTo(() => AudioBook)
  audio_book: AudioBook;
} 

