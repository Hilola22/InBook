import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Collection } from "../../collection/models/collection.model";
import { BookMark } from "src/book-marks/models/book-mark.model";
import { Subscribtion } from "src/subscribtion/models/subscribtion.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  birth_year: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchini ismi-familyasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "user@mail.uz",
    description: "Foydalanuvchini pochatsi",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Foydalanuvchini paroli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "Ayol",
    description: "Foydalanuvchini jinsi",
  })
  @Column({
    type: DataType.ENUM("Erkak", "Ayol"),
  })
  declare gender: string;

  @ApiProperty({
    example: 2004,
    description: "Foydalanuvchini tug'ilgan yili",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchini aktivligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi primum obunachisimi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;

  @ApiProperty({
    example: "activate_link",
    description: "Foydalanuvchini aktivatsiya linki",
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: "refresh_token...",
    description: "Foydalanuvchi refresh tokeni",
  })
  @Column({
    type: DataType.STRING(2000),
  })
  declare refreshToken: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi refresh tokeni",
  })
  @Column({
    type: DataType.STRING(20),
  })
  declare phone: string;

  @HasMany(() => Collection)
  collections: Collection[];

  @HasMany(() => BookMark)
  bookMarks: BookMark[];

  @HasMany(() => Subscribtion)
  subscribtions: Subscribtion[];
}
