import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookMark } from "./models/book-mark.model";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";
import { Book } from "src/books/models/book.model";
import { User } from "src/users/models/user.model";

@Injectable()
export class BookMarksService {
  constructor(
    @InjectModel(BookMark) private readonly bookMarkModel: typeof BookMark,
    @InjectModel(Book) private readonly bookModel: typeof Book,
    @InjectModel(User) private readonly userModel: typeof User
  ) {}

  async create(dto: CreateBookMarkDto) {
    const user = await this.userModel.findByPk(dto.userId);
    if (!user) throw new BadRequestException("Foydalanuvchi topilmadi!");
    const book = await this.bookModel.findByPk(dto.bookId);
    if (!book) throw new BadRequestException("Kitob topilmadi!");
    return this.bookMarkModel.create(dto);
  }

  async findAll() {
    return this.bookMarkModel.findAll({ include: [Book, User] });
  }

  async findOne(id: number) {
    const mark = await this.bookMarkModel.findByPk(id, {
      include: [Book, User],
    });
    if (!mark) throw new NotFoundException("BookMark topilmadi!");
    return mark;
  }

  async update(id: number, dto: UpdateBookMarkDto) {
    const mark = await this.bookMarkModel.findByPk(id);
    if (!mark) throw new NotFoundException("BookMark topilmadi!");
    if (dto.userId) {
      const user = await this.userModel.findByPk(dto.userId);
      if (!user) throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    if (dto.bookId) {
      const book = await this.bookModel.findByPk(dto.bookId);
      if (!book) throw new BadRequestException("Kitob topilmadi!");
    }
    await mark.update(dto);
    return mark;
  }

  async remove(id: number) {
    const mark = await this.bookMarkModel.findByPk(id);
    if (!mark) throw new NotFoundException("BookMark topilmadi!");
    await mark.destroy();
    return { message: "BookMark muvaffaqiyatli o'chirildi" };
  }
}
