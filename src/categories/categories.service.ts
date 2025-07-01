import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Categories } from "./models/category.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories) private readonly categoryModel: typeof Categories) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto)
  }

  findAll() {
    return this.categoryModel.findAll()
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return updatedCategory[1][0];
  }

  async remove(id: number) {
    const deletedCategory = await this.categoryModel.destroy({ where: { id } });
    if (deletedCategory > 0) {
      return "Category deleted!";
    }
    return "Category not found!";
  }
}
