import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Adminning ismi-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

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

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Adminni paroli",
  })
  @IsStrongPassword({ minLength: 6 })
  @IsNotEmpty()
  confirm_password: string;
}
