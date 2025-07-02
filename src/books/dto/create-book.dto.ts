import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateBookDto {
  @ApiProperty({
    example: 2021,
    description: "Kitob nashr qilingan yil",
  })
  @IsNumber()
  @Min(1950)
  @Max(new Date().getFullYear())
  published_year: number;

  @ApiProperty({
    example: 1,
    description: "Muallifning Idsi",
  })
  @IsNumber()
  @IsNotEmpty()
  author_id: number;
}
