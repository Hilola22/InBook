import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBookVersionDto } from "./dto/create-book-version.dto";
import { UpdateBookVersionDto } from "./dto/update-book-version.dto";
import { BookVersion } from "./models/book-version.model";
import { Book } from "../books/models/book.model";
import { Language } from "../languages/models/language.model";

@Injectable()
export class BookVersionService {
  constructor(
    @InjectModel(BookVersion) private bookVersionModel: typeof BookVersion,
    @InjectModel(Book) private bookModel: typeof Book,
    @InjectModel(Language) private languageModel: typeof Language
  ) {}

  async create(createBookVersionDto: CreateBookVersionDto) {
    const { book_id, language_id } = createBookVersionDto;

    const book = await this.bookModel.findByPk(book_id);
    if (!book) {
      throw new BadRequestException(`Book with ID ${book_id} not found`);
    }

    const language = await this.languageModel.findByPk(language_id);
    if (!language) {
      throw new BadRequestException(
        `Language with ID ${language_id} not found`
      );
    }

    const newBookVersion =
      await this.bookVersionModel.create(createBookVersionDto);
    return newBookVersion;
  }

  async findAll() {
    return this.bookVersionModel.findAll({ include: [Book, Language] });  
  }

  async findOne(id: number) {
    const bookVersion = await this.bookVersionModel.findByPk(id, {
      include: [Book, Language],
    });
    if (!bookVersion) {
      throw new BadRequestException(`Book version with ID ${id} not found`);
    }
    return bookVersion;
  }

  async update(id: number, updateBookVersionDto: UpdateBookVersionDto) {
    const updatedBookVersion = await this.bookVersionModel.update(
      updateBookVersionDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updatedBookVersion[1][0];
  }

  async remove(id: number) {
    const deletedBookVersion = await this.bookVersionModel.destroy({
      where: { id },
    });
    if (deletedBookVersion === 0) {
      throw new BadRequestException(`Book version with ID ${id} not found`);
    }
    return `Book version with ID ${id} deleted successfully`;
  }
}
