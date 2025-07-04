import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Book } from "../../books/models/book.model";
import { Collection } from "../../collection/models/collection.model";

interface IBookCollectionCreationAttr{
    collectionId: number;
    bookId: number;
}
@Table({ tableName: "book-collection" })
export class BookCollection extends Model<
  BookCollection,
  IBookCollectionCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Kitob kalleksiyasining unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Kolleksiya Idsi",
  })
  @ForeignKey(()=> Collection)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare collectionId: number;

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

  @BelongsTo(() => Book)
  book: Book

  @BelongsTo(()=> Collection)
  collection: Collection
}
