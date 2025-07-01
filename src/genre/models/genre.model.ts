import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface iGenreCreationAttr{
    name: string;
}
@Table({tableName: "genre"})
export class Genre extends Model<Genre, iGenreCreationAttr>{
    @ApiProperty({
        example: 1,
        description: "Janrning unilkal Idsi"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @ApiProperty({
        example: "Roman",
        description: "Janr nomi"
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare name: string;
}
