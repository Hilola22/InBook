import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  Max,
  IsPhoneNumber,
} from "class-validator";

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

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Foydalanuvchini paroli",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Parolni tasdiqlash",
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchini telefon raqami",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "Erkak",
    description: "Foydalanuvchini jinsi",
    enum: ["Erkak", "Ayol"],
  })
  @IsEnum(["Erkak", "Ayol"])
  gender: string;

  @ApiProperty({
    example: 2000,
    description: "Foydalanuvchini tug'ilgan yili",
    minimum: 1900,
  })
  @IsNumber()
  @Min(1900)
  birth_year: number;
}
