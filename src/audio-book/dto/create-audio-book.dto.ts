import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAudioBookDto {
  @ApiProperty({
    example: 1,
    description: "Kitob versiyasi Idsi",
  })
  @IsNumber()
  @IsNotEmpty()
  book_version_id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Ovoz muallifi ism-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  narrator_name: string;

  @ApiProperty({
    example: 15,
    description: "Audio davomiyligi (min)",
  })
  @IsNumber()
  total_duration: number;

  @ApiProperty({
    example: 220,
    description: "Audio hajmi (MB)",
  })
  @IsNumber()
  total_size_mb: number;
}
