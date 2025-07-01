import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({
    example: "UZ",
    description: "Davlat kodi",
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: "O'zbek tili",
    description: "Davlat tili nomi",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "uzb_flag_url",
    description: "Davlat bayrog'i rasmi urli",
  })
  @IsString()
  flag: string;
}
