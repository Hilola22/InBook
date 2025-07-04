import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookCollectionDto {
  @ApiProperty({ example: 1, description: "Kolleksiya IDsi" })
  @IsInt()
  @IsNotEmpty()
  collectionId: number;

  @ApiProperty({ example: 1, description: "Kitob IDsi" })
  @IsInt()
  @IsNotEmpty()
  bookId: number;
}
