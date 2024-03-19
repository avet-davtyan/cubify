import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/RegisterUser.dto';
import { RegisteredUser, User } from './types/user.types';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    let user: RegisteredUser;

    user = await this.prismaService.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });

    if (user) {
      throw new HttpException('username already exists', HttpStatus.CONFLICT);
    }

    user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new HttpException('email is already taken', HttpStatus.CONFLICT);
    }

    user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });

    const _user: User = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return _user;
  }
}
