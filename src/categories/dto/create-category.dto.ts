import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Bestseller",
    description: "Kategoriya nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
