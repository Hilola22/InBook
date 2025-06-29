import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match ❌");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashed_password,
    });
    return newAdmin;
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findAdminByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  findAdminById(id: number) {
    return this.adminModel.findByPk(id);
  }

  findAdminByActivationLink(activationLink: string) {
    return this.adminModel.findOne({
      where: { activation_link: activationLink },
    });
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async update({
    id,
    updateAdminDto,
  }: {
    id: number;
    updateAdminDto: UpdateAdminDto;
  }) {
    const updatedAdmin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedAdmin[1][0];
  }

  async remove(id: number) {
    const deleteAdmin = await this.adminModel.destroy({ where: { id } });
    if (deleteAdmin > 0) {
      return "Admin deleted ✅";
    }
    return "Admin not found 🔍";
  }

  async activateAdmin(activationLink: string) {
    const admin = await this.findAdminByActivationLink(activationLink);
    if (!admin) {
      throw new BadRequestException("Invalid activation link");
    }

    if (admin.is_active) {
      throw new BadRequestException("Admin is already activated");
    }

    admin.is_active = true;
    await admin.save();

    return { message: "Admin activated successfully" };
  }
}
