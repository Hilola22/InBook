import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchini ismi-familyasi",
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: "user@mail.uz",
    description: "Foydalanuvchini pochatsi",
  })
  @IsEmail()
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  gender: string;
  birth_year: number;
}
