import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "../../books/models/book.model";
import { Language } from "../../languages/models/language.model";

interface IBookVersionCreationAttr {
  title: string;
  description: string;
  price: number;
  book_id: number;
  language_id: number;
}

@Table({ tableName: "book_version" })
export class BookVersion extends Model<BookVersion, IBookVersionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kitob versionining unikal IDsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Book Title in Uzbek",
    description: "The title of the book in a specific language",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @ApiProperty({
    example: "This is the description of the book in Uzbek.",
    description: "The description of the book in a specific language",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @ApiProperty({
    example: 25.99,
    description: "The price of the book version",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @ApiProperty({
    example: 1,
    description: "Associated Book ID",
  })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare book_id: number;

  @BelongsTo(() => Book)
  book: Book;

  @ApiProperty({
    example: 1,
    description: "Associated Language ID",
  })
  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare language_id: number;

  @BelongsTo(() => Language)
  language: Language;
}
