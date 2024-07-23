import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const verifyIfUserExist = await this.prisma.user.findFirst({
      where: {
        cpf: createUserDto.cpf,
      },
    });

    if (!verifyIfUserExist)
      return await this.prisma.user.create({
        data: createUserDto,
      });

    return verifyIfUserExist;
  }

  async alreadExists(cpf: string) {
    return await this.prisma.user.findFirst({
      where: {
        cpf,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}