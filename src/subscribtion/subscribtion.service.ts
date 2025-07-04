import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subscribtion } from "./models/subscribtion.model";
import { CreateSubscribtionDto } from "./dto/create-subscribtion.dto";
import { UpdateSubscribtionDto } from "./dto/update-subscribtion.dto";

@Injectable()
export class SubscribtionService {
  constructor(
    @InjectModel(Subscribtion)
    private readonly subscribtionModel: typeof Subscribtion
  ) {}

  create(createSubscribtionDto: CreateSubscribtionDto) {
    return this.subscribtionModel.create(createSubscribtionDto);
  }

  findAll() {
    return this.subscribtionModel.findAll();
  }

  findOne(id: number) {
    return this.subscribtionModel.findByPk(id);
  }

  async update(id: number, updateSubscribtionDto: UpdateSubscribtionDto) {
    const subscribtion = await this.subscribtionModel.update(
      updateSubscribtionDto,
      {
        where: { id },
        returning: true,
      }
    );
    return subscribtion[1][0];
  }

  async remove(id: number) {
    const deleted = await this.subscribtionModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "Subscribtion deleted!";
    }
    return "Subscribtion not found!";
  }
}
