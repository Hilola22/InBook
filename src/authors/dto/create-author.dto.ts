import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({
    example: "O'tkir Hohimov",
    description: "Muallif ism-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "Yozuvchi, tilshunos...",
    description: "Muallif haqida",
  })
  @IsString()
  bio: string;

  @ApiProperty({
    example: "author_photo.url",
    description: "Muallif rasmi",
  })
  @IsString()
  photo_url: string;
}
