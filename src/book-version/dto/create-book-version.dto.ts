import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookVersionDto {
  @ApiProperty({
    example: "Book Title in Uzbek",
    description: "The title of the book in a specific language",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "This is the description of the book in Uzbek.",
    description: "The description of the book in a specific language",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 25.99,
    description: "The price of the book version",
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 1,
    description: "The ID of the associated book",
  })
  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({
    example: 1,
    description: "The ID of the associated language",
  })
  @IsNumber()
  @IsNotEmpty()
  language_id: number;
}
