import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class PhoneUserDto {
  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchini raqami",
  })
  @IsPhoneNumber("UZ")
  phone: string;
}
