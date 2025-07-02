import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAudioBookDto } from "./dto/create-audio-book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio-book.dto";
import { AudioBook } from "./models/audio-book.model";
import { BookVersion } from "../book-version/models/book-version.model";

@Injectable()
export class AudioBookService {
  constructor(
    @InjectModel(AudioBook) private audioBookModel: typeof AudioBook,
    @InjectModel(BookVersion) private bookVersionModel: typeof BookVersion
  ) {}

  async create(createAudioBookDto: CreateAudioBookDto) {
    const { book_version_id } = createAudioBookDto;
    const bookVersion = await this.bookVersionModel.findByPk(book_version_id);
    if (!bookVersion) {
      throw new BadRequestException(
        `Book version with ID ${book_version_id} not found`
      );
    }
    const newAudioBook = await this.audioBookModel.create(createAudioBookDto);
    return newAudioBook;
  }

  async findAll() {
    return this.audioBookModel.findAll({ include: [BookVersion] });
  }

  async findOne(id: number) {
    const audioBook = await this.audioBookModel.findByPk(id, {
      include: [BookVersion],
    });
    if (!audioBook) {
      throw new BadRequestException(`Audiobook with ID ${id} not found`);
    }
    return audioBook;
  }

  async update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
    const { book_version_id } = updateAudioBookDto;

    if (book_version_id) {
      const bookVersion = await this.bookVersionModel.findByPk(book_version_id);
      if (!bookVersion) {
        throw new BadRequestException(
          `Book version with ID ${book_version_id} not found`
        );
      }
    }
    const updatedAudioBook = await this.audioBookModel.update(
      updateAudioBookDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updatedAudioBook[1][0];
  }

  async remove(id: number) {
    const deletedAudioBook = await this.audioBookModel.destroy({
      where: { id },
    });
    if (deletedAudioBook > 0) {
      return "Audiobook deleted!";
    }
    return "Audiobook not found!";
  }
}
