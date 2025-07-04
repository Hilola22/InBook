import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "src/books/models/book.model";
import { User } from "src/users/models/user.model";

interface IBookMarkCreationAttr {
  userId: number;
  bookId: number;
  note: string;
  position: string;
}
@Table({ tableName: "book-marks" })
export class BookMark extends Model<BookMark, IBookMarkCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kitob belgilangan sahifasi unikal IDsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Kitob Idsi",
  })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare bookId: number;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi Idsi",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
