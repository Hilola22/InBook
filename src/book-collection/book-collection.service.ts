import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookCollection } from "./models/book-collection.model";
import { CreateBookCollectionDto } from "./dto/create-book-collection.dto";
import { UpdateBookCollectionDto } from "./dto/update-book-collection.dto";
import { Book } from "../books/models/book.model";
import { Collection } from "../collection/models/collection.model";

@Injectable()
export class BookCollectionService {
  constructor(
    @InjectModel(BookCollection)
    private readonly bookCollectionModel: typeof BookCollection,
    @InjectModel(Book) private readonly bookModel: typeof Book,
    @InjectModel(Collection) private readonly collectionModel: typeof Collection
  ) {}

  async create(createBookCollectionDto: CreateBookCollectionDto) {
    const { bookId, collectionId } = createBookCollectionDto;
    const book = await this.bookModel.findByPk(bookId);
    if (!book) {
      throw new BadRequestException("Kitob topilmadi!");
    }
    const collection = await this.collectionModel.findByPk(collectionId);
    if (!collection) {
      throw new BadRequestException("Kolleksiya topilmadi!");
    }
    const exists = await this.bookCollectionModel.findOne({
      where: { bookId, collectionId },
    });
    if (exists) {
      throw new BadRequestException(
        "Bu kitob ushbu kolleksiyada allaqachon mavjud!"
      );
    }
    return this.bookCollectionModel.create(createBookCollectionDto);
  }

  async findAll() {
    return this.bookCollectionModel.findAll({
      include: [Book, Collection],
    });
  }

  async findOne(id: number) {
    const item = await this.bookCollectionModel.findByPk(id, {
      include: [Book, Collection],
    });
    if (!item) {
      throw new NotFoundException("Book-Collection topilmadi!");
    }
    return item;
  }

  async update(id: number, updateBookCollectionDto: UpdateBookCollectionDto) {
    const item = await this.bookCollectionModel.findByPk(id);
    if (!item) {
      throw new NotFoundException("Book-Collection topilmadi!");
    }
    if (updateBookCollectionDto.bookId) {
      const book = await this.bookModel.findByPk(
        updateBookCollectionDto.bookId
      );
      if (!book) {
        throw new BadRequestException("Kitob topilmadi!");
      }
    }
    if (updateBookCollectionDto.collectionId) {
      const collection = await this.collectionModel.findByPk(
        updateBookCollectionDto.collectionId
      );
      if (!collection) {
        throw new BadRequestException("Kolleksiya topilmadi!");
      }
    }
    await item.update(updateBookCollectionDto);
    return item;
  }

  async remove(id: number) {
    const item = await this.bookCollectionModel.findByPk(id);
    if (!item) {
      throw new NotFoundException("Book-Collection topilmadi!");
    }
    await item.destroy();
    return { message: "Book-Collection muvaffaqiyatli o'chirildi" };
  }
}
