import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./models/collection.model";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/models/user.model";

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection)
    private readonly collectionModel: typeof Collection,
    private readonly userService: UsersService
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const userId = await this.userService.findUserById(
      createCollectionDto.createdBy
    );
    if (!userId) {
      throw new BadRequestException("Kolleksiya egasi topilmadi!");
    }
    const collection = await this.collectionModel.create(createCollectionDto);
    return collection;
  }

  async findAll(): Promise<Collection[]> {
    return this.collectionModel.findAll({
      include: { model: User, attributes: ["full_name", "email"] },
    });
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionModel.findByPk(id);
    if (!collection) {
      throw new NotFoundException("Kolleksiya topilmadi");
    }
    return collection;
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto
  ): Promise<Collection> {
    const collection = await this.findOne(id);
    await collection.update(updateCollectionDto);
    return collection;
  }

  async remove(id: number): Promise<{ message: string }> {
    const collection = await this.findOne(id);
    await collection.destroy();
    return { message: "Kolleksiya muvaffaqiyatli o'chirildi" };
  }
}
