import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubscribtionDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi Idsi",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: "2025-06-25",
    description: "Obuna bo'lingan sana",
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: "2025-07-25",
    description: "Obuna tugash sanasi",
  })
  @IsDateString()
  end_date: Date;
}
