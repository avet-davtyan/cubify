import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { User } from './types/user.types';
import { PassService } from './services/pass.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { Headers } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private passService: PassService,
		private jwtService: JwtService,
		private refreshTokenStrategy: RefreshTokenStrategy,
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

	async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.prismaService.findUser(loginUserDto.emailOrUsername);
		await this.passService.compare(loginUserDto.password, user.password);

		const reqUser: User = {
			id: user.id,
			email: user.email,
			username: user.username,
		};
		const accessToken = await this.jwtService.signAsync(reqUser);
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken(reqUser);

		return {
			accessToken,
			refreshToken,
		};
	}

	async verify(req: Request) {
		const user = req.user as User;
		const reqUser: User = {
			id: user.id,
			email: user.email,
			username: user.username,
		};
		return reqUser;
	}

	async refresh(refreshToken: string): Promise<{ accessToken: string }> {
		const user = this.refreshTokenStrategy.verify(refreshToken) as User;
		const reqUser: User = {
			id: user.id,
			email: user.email,
			username: user.username,
		};
		const accessToken = await this.jwtService.signAsync(reqUser);

		return { accessToken };
	}
}
