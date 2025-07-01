import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IcategoriesCreationAttr {
  name: string;
}
@Table({ tableName: "catgories" })
export class Categories extends Model<Categories, IcategoriesCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Kategoriyaning unilkal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Bestseller",
    description: "Kategoriya nomi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;
}
