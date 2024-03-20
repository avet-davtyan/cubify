import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dtos/RegisterUser.dto'
import { RegisteredUser, User } from './types/user.types'
import { PasswordConfig } from './types/passwordConfig.types'
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {
  private passwordConfig: PasswordConfig
  constructor(private prismaService: PrismaService) {
    this.passwordConfig = {
      salt: 10,
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    let user: RegisteredUser

    user = await this.prismaService.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    })

    if (user) {
      throw new HttpException('username already exists', HttpStatus.CONFLICT)
    }

    user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    })

    if (user) {
      throw new HttpException('email is already taken', HttpStatus.CONFLICT)
    }

    const hashedPassword = await hash(createUserDto.password, this.passwordConfig.salt)
    console.log(createUserDto)

    user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    })

    const _user: User = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    return _user
  }
}
