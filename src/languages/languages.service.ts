import { Injectable } from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Language } from "./models/language.model";

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language) private languageModel: typeof Language) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.languageModel.create(createLanguageDto);
  }

  async findAll() {
    return await this.languageModel.findAll();
  }

  async findOne(id: number) {
    return await this.languageModel.findByPk(id);
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const updatedLanguage = await this.languageModel.update(updateLanguageDto, {
      where: { id },
      returning: true,
    });
    return updatedLanguage[1][0];
  }

  async remove(id: number) {
    const deletedLanguage = await this.languageModel.destroy({
      where: { id },
    });
    if (deletedLanguage > 0) {
      return "Language deleted!";
    }
    return "Language not found!";
  }
}
