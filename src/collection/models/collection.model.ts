import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Book } from "../../books/models/book.model";
import { BookCollection } from "../../book-collection/models/book-collection.model";

interface ICollectionCreationAttr {
  title: string;
  description: string;
  coverImageUrl: string;
  createdBy: number;
}

@Table({ tableName: "collection" })
export class Collection extends Model<Collection, ICollectionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kolleksiyaning unikal IDsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Kitob sarlavhasi",
    description: "Kitob muqovasidagi nomi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @ApiProperty({
    example: "Roman 1950-yilda yozilgan...",
    description: "Kitob haqida izoh",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @ApiProperty({
    example: "cover_image_book_url",
    description: "Kitob muqovasidagi rasm",
  })
  @Column({
    type: DataType.STRING,
  })
  declare coverImageUrl: string;

  @ApiProperty({
    example: 1,
    description: "Kitob chop etgan foydalanuvchi Idsi",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare createdBy: number;

  @ApiProperty({
    example: false,
    description: "Kitob ommaviymi yoki maxfiy",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isPublic: boolean;

  @ApiProperty({
    example: true,
    description: "Kitob faqat premium foydalanuvchilari uchunmi?",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isPremium: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Book, () => BookCollection)
  books: Book[];
}
