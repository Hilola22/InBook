import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAudioPartDto {
  @ApiProperty({
    example: 1,
    description: "Audio kitobining Idsi",
  })
  @IsNotEmpty()
  @IsNumber()
  audio_book_id: number;

  @ApiProperty({
    example: "O'tgan kunlar 1 bo'lim",
    description: "Kitob bo'limining sarlavhasi",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "https://example.com/audio-part-1.mp3",
    description: "Kitob bo'limining audio fayli",
  })
  @IsString()
  file_url: string;

  @ApiProperty({
    example: 15,
    description: "Kitob bo'limining davomiyligi (min)",
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: 220,
    description: "Kitob bo'limining hajmi (MB)",
  })
  @IsNotEmpty()
  @IsNumber()
  size_mb: number;

  @ApiProperty({
    example: 1,
    description: "Kitob bo'limining tartib raqami",
  })
  @IsNotEmpty()
  @IsNumber()
  order_index: number;
}
