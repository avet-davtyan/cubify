import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/RegisterUser.dto';
import { RegisteredUser, User } from './types/user.types';
import { PassService } from './pass/pass.service';

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private passService: PassService,
	) {}

	async register(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await this.passService.hash(createUserDto.password);
		const user = await this.prismaService.user.create({
			data: {
				...createUserDto,
				password: hashedPassword,
			},
		});

		const reqUser: User = {
			id: user.id,
			email: user.email,
			username: user.username,
		};

		return reqUser;
	}
}
