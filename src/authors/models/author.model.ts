import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAuthorCreationAttr {
  full_name: string;
  bio: string;
  photo_url: string;
}
@Table({ tableName: "authors" })
export class Authors extends Model<Authors, IAuthorCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Muallifning unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "O'tkir Hoshimov",
    description: "Muallif ism-fmailyasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "Yozuvchi, tilshunos...",
    description: "Muallif haqida",
  })
  @Column({
    type: DataType.STRING,
  })
  declare bio: string;

  @ApiProperty({
    example: "author_photo.url",
    description: "Muallif rasmi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare photo_url: string;
}
