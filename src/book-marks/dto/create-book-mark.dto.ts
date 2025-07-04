import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookMarkDto {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: "Kitob IDsi" })
  @IsInt()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({ example: "Qiziqarli joy", description: "Izoh" })
  @IsString()
  note: string;

  @ApiProperty({
    example: "page:45",
    description: "Pozitsiya (masalan, sahifa raqami)",
  })
  @IsString()
  position: string;
}
