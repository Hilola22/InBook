import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBotCreationAttr {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  language_code: string;
}

@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCreationAttr> {
  @ApiProperty({
    example: "Telegramdan yuboriladi",
    description: "Botni unikal Idsi",
  })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare user_id: number;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi nomi",
  })
  @Column({
    type: DataType.STRING(100),
  })
  declare username: string;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi ismi",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare first_name: string;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi familyasi",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare last_name: string;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi davlat tili",
  })
  @Column({
    type: DataType.STRING(3),
  })
  declare language_code: string;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi telefon raqami",
  })
  @Column({
    type: DataType.STRING(15),
  })
  declare phone_number: string;

  @ApiProperty({
    example: "Telegramdan olinadi",
    description: "Foydalanuvchi holati",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare status: boolean;
}
