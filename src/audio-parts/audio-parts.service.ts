import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AudioPart } from "./models/audio-part.model";
import { AudioBook } from "src/audio-book/models/audio-book.model";

@Injectable()
export class AudioPartsService {
  constructor(
    @InjectModel(AudioPart) private audioPartModel: typeof AudioPart,
    @InjectModel(AudioBook) private audioBookModel: typeof AudioBook
  ) {}
  async create(createAudioPartDto: CreateAudioPartDto) {
    const audioBook = await this.audioBookModel.findByPk(
      createAudioPartDto.audio_book_id
    );
    if (!audioBook) {
      throw new BadRequestException("Audio book not found");
    }
    return this.audioPartModel.create(createAudioPartDto);
  }

  findAll() {
    return this.audioPartModel.findAll({ include: [AudioBook] });
  }

  findOne(id: number) {
    return this.audioPartModel.findByPk(id, { include: [AudioBook] });
  }

  async update(id: number, updateAudioPartDto: UpdateAudioPartDto) {
    const audioPart = await this.audioPartModel.update(updateAudioPartDto, {
      where: { id },
      returning: true,
    });
    return audioPart[1][0];
  }

  async remove(id: number) {
    const deletedAudioPart = await this.audioPartModel.destroy({  
      where: { id },
    });
    if (deletedAudioPart > 0) {
      return "Audio part deleted!";
    }
    return "Audio part not found!";
  }
}
