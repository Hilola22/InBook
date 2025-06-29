import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInUserDto {
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
}
