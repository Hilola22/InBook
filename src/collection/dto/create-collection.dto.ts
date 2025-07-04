import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({
    example: "Kitob sarlavhasi",
    description: "Kitob muqovasidagi nomi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Roman 1950-yilda yozilgan...",
    description: "Kitob haqida izoh",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "cover_image_book_url",
    description: "Kitob muqovasidagi rasm",
  })
  @IsString()
  @IsNotEmpty()
  coverImageUrl: string;

  @ApiProperty({
    example: 1,
    description: "Kitob chop etgan foydalanuvchi Idsi",
  })
  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
