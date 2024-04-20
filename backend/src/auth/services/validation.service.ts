import {
	BadRequestException,
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from '../dtos/AuthUser.dto';
import { GoogleUser, SimpleUser, UserAuth } from '../types/user.types';
import { User, UserAuthentication } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class ValidationService {
	constructor(private prismaService: PrismaService) {}
	async login(loginUserDto: LoginUserDto): Promise<User> {
		const userAuth = await this.prismaService.userAuthentication.findFirst({
			where: {
				username: loginUserDto.emailOrUsername,
			},
			include: { simpleUser: true },
		});

		let user;

		if (!userAuth) {
			user = await this.prismaService.user.findFirst({
				where: {
					email: loginUserDto.emailOrUsername,
				},
			});
			if (user === null) {
				throw new NotFoundException('User is not Found');
			}
		} else {
			if (!userAuth.simpleUser) {
				throw new BadRequestException('User is registered with other services');
			}
			user = userAuth.simpleUser;
		}

		return user;
	}

	async verify(req: Request): Promise<UserAuth> {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
			include: { simpleUser: true, googleUser: true },
		});

		if (user === null) {
			throw new BadRequestException('User is not found');
		}
		if (!user.verified) {
			throw new ForbiddenException('Please verify your email');
		}

		if (user.username === null) {
			throw new UnprocessableEntityException('Please set a username');
		}

		return user;
	}

	async verifyGoogle(req: Request): Promise<UserAuth> {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
			include: { googleUser: true, simpleUser: true },
		});
		if (user === null) {
			throw new NotFoundException('User is not found');
		}

		if (user.username !== null) {
			throw new BadRequestException('User already has a username');
		}
		return user;
	}

	async verifyNotVerified(req: Request): Promise<UserAuth> {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
			include: { googleUser: true, simpleUser: true },
		});
		if (user === null) {
			throw new NotFoundException('User is not found');
		}

		if (user.verified) {
			throw new BadRequestException('User has verified his account');
		}

		return user;
	}

	async createUsername(req: Request, usernameData: { username: string }): Promise<UserAuth> {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
		});
		if (user === null) {
			throw new NotFoundException('User is not found');
		}

		if (user.username !== null) {
			throw new BadRequestException('User already has a username');
		}

		const existingUser = await this.prismaService.userAuthentication.findFirst({
			where: {
				username: usernameData.username,
			},
		});

		if (existingUser !== null) {
			throw new UnprocessableEntityException('username already exists');
		}
		return user;
	}

	googleLogin(req: Request) {
		if (!req.user) {
			throw new UnauthorizedException('User need to be authorized');
		}
	}
}
