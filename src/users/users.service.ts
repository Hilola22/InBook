import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });
    //sendMail
    return newUser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findUserById(id: number) {
    return this.userModel.findByPk(id);
  }

  findUserByActivationLink(activationLink: string) {
    return this.userModel.findOne({
      where: { activation_link: activationLink },
    });
  }

  async activateUser(activationLink: string) {
    const user = await this.findUserByActivationLink(activationLink);
    if (!user) {
      throw new BadRequestException("Invalid activation link");
    }

    if (user.is_active) {
      throw new BadRequestException("User is already activated");
    }

    user.is_active = true;
    await user.save();

    return { message: "User activated successfully" };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedUser[1][0];
  }

  async remove(id: number) {
    const deleteUser = await this.userModel.destroy({ where: { id } });
    if (deleteUser > 0) {
      return "User o'chirildi!";
    }
    return "User topilmadi";
  }
}
