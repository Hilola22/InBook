import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SigninAdminDto {
  @ApiProperty({
    example: "admin@mail.uz",
    description: "Adminning pochatsi",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Adminni paroli",
  })
  @IsStrongPassword({ minLength: 6 })
  @IsNotEmpty()
  password: string;
}
