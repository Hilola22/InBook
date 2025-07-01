import { Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { AuthorsController } from "./authors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Authors } from "./models/author.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Authors]), JwtModule.register({})],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
