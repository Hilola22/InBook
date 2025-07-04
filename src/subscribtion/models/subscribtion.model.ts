import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface ISubscribtionCreationAttr{
    userId: number;
    start_date: Date;
    end_date: Date;
}
@Table({ tableName: "subscription" })
export class Subscribtion extends Model<
  Subscribtion,
  ISubscribtionCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Obunaning unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi Idsi",
  })
  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @ApiProperty({
    example: "2025-06-25",
    description: "Obuna bo'lingan sana",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare start_date: Date;

  @ApiProperty({
    example: "2025-07-25",
    description: "Obuna tugash sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare end_date: Date;

  @BelongsTo(()=> User)
  user: User;
}
