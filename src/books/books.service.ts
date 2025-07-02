import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { Authors } from "../authors/models/author.model";

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book) private bookModel: typeof Book,
    @InjectModel(Authors) private authorModel: typeof Authors
  ) {}

  async create(createBookDto: CreateBookDto) {
    const author = await this.authorModel.findByPk(createBookDto.author_id);
    if (!author) {
      throw new BadRequestException("Author not found");
    }
    return await this.bookModel.create(createBookDto);
  }

  async findAll() {
    return await this.bookModel.findAll({
      include: {
        model: Authors,
        attributes: ["full_name"],
      },
    });
  }

  async findOne(id: number) {
    return await this.bookModel.findByPk(id, {
      include: {
        model: Authors,
        attributes: ["full_name"],
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    if (updateBookDto.author_id) {
      const author = await this.authorModel.findByPk(updateBookDto.author_id);
      if (!author) {
        throw new BadRequestException("Author not found");
      }
    }
    const updatedBook = await this.bookModel.update(updateBookDto, {
      where: { id },
      returning: true,
    });
    return updatedBook[1][0];
  }

  async remove(id: number) {
    const deletedBook = await this.bookModel.destroy({
      where: { id },
    });
    if (deletedBook > 0) {
      return "Book deleted!";
    }
    return "Book not found!";
  }
}
