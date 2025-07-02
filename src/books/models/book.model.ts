import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Authors } from "../../authors/models/author.model";
import { BookVersion } from "../../book-version/models/book-version.model";

interface IBookCreationAttr {
  published_year: number;
  author_id: number;
}
@Table({ tableName: "books" })
export class Book extends Model<Book, IBookCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kitobning unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 2021,
    description: "Kitob nashr qilingan yil",
  })
  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1950,
      max: new Date().getFullYear(),
      isInt: true,
    },
  })
  declare published_year: number;

  @ApiProperty({
    example: 1,
    description: "Muallifning Idsi",
  })
  @ForeignKey(()=>Authors)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare author_id: number;

  @BelongsTo(() => Authors)
  author: Authors;

  @HasMany(() => BookVersion)
  book_versions: BookVersion[]
}
