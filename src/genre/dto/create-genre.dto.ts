import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDto {
  @ApiProperty({
    example: "Roman",
    description: "Janr nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
