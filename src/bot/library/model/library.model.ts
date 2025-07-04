import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ILibraryCreationAttr {
  last_state: string;
  user_id: number;
}

@Table({ tableName: "library" })
export class Library extends Model<Library, ILibraryCreationAttr> {
  @ApiProperty({
    example: "Botdan yuboriladi",
    description: "Kutubxona unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Botdan olinadi",
    description: "Kutubxona oxirgi holati",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare last_state: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING(15),
  })
  declare phone_number: string;
}
