import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ILanguageCreationAttr {
  code: string;
  name: string;
  flag: string;
}
@Table({ tableName: "languages" })
export class Language extends Model<Language, ILanguageCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Tilning(davlat tili) unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "UZ",
    description: "Davlat kodi",
  })
  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  declare code: string;

  @ApiProperty({
    example: "O'zbek tili",
    description: "Davlat tili nomi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "uzb_flag_url",
    description: "Davlat bayrog'i rasmi urli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare flag: string;
}
