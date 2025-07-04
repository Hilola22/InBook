import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class VerifyOtpDto {
  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchini raqami",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  otp: string;
  verification_key: string;
}
