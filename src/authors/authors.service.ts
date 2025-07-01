import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Authors } from "./models/author.model";

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Authors) private authorModel: typeof Authors) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorModel.create(createAuthorDto);
  }

  async findAll() {
    return await this.authorModel.findAll();
  }

  async findOne(id: number) {
    return await this.authorModel.findByPk(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const updatedAuthor = await this.authorModel.update(updateAuthorDto, {
      where: { id },
      returning: true,
    });
    return updatedAuthor[1][0];
  }

  async remove(id: number) {
    const deletedAuthor = await this.authorModel.destroy({
      where: { id },
    });
    if (deletedAuthor > 0) {
      return "Author deleted!";
    }
    return "Author not found!";
  }
}
