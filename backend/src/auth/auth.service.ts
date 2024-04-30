import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { GoogleUser, SimpleUser, User, UserAuth } from './types/user.types';
import { PassService } from './services/pass.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserAuthentication } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { ValidationService } from './services/validation.service';

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private passService: PassService,
		private jwtService: JwtService,
		private refreshTokenStrategy: RefreshTokenStrategy,
		private mailService: MailService,
		private validationService: ValidationService,
	) {}

	async register(createUserDto: CreateUserDto): Promise<string> {
		const hashedPassword = await this.passService.hash(createUserDto.password);
		const user = await this.prismaService.userAuthentication.create({
			data: {
				username: createUserDto.username,
				simpleUser: {
					create: {
						email: createUserDto.email,
						fullName: createUserDto.fullName,
						password: hashedPassword,
					},
				},
			},
			include: { simpleUser: true },
		});

		await this.mailService.sendMail(user);

		return 'User is registered';
	}

	async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.validationService.login(loginUserDto);
		await this.passService.compare(loginUserDto.password, user.password);

		const tokenPayload: { id: string } = {
			id: user.id,
		};
		const accessToken = await this.jwtService.signAsync(tokenPayload);
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken(tokenPayload);

		return {
			accessToken,
			refreshToken,
		};
	}

	async verify(req: Request) {
		const user: UserAuth = await this.validationService.verify(req);

		let responseData: GoogleUser | User;

		if (user.googleUser) {
			responseData = {
				id: user.id,
				email: user.googleUser.email,
				fullName: user.googleUser.fullName,
				googleId: user.googleUser.googleId,
				avatar: user.googleUser.avatar,
				username: user.username,
			};
		}
		if (user.simpleUser) {
			responseData = {
				id: user.id,
				email: user.simpleUser.email,
				username: user.username,
				fullName: user.simpleUser.fullName,
			};
		}

		return responseData;
	}

	async verifyGoogle(req: Request) {
		const user: UserAuth = await this.validationService.verifyGoogle(req);

		let responseData: { fullName: string; avatar?: string };

		if (user.googleUser) {
			responseData = {
				fullName: user.googleUser.fullName,
				avatar: user.googleUser.avatar,
			};
		}
		if (user.simpleUser) {
			responseData = {
				fullName: user.simpleUser.fullName,
			};
		}

		return responseData;
	}

	async verifyNotVerified(req: Request) {
		const user: UserAuth = await this.validationService.verifyNotVerified(req);

		let responseData: { fullName: string };
		if (user.googleUser) {
			responseData = {
				fullName: user.googleUser.fullName,
			};
		}
		if (user.simpleUser) {
			responseData = {
				fullName: user.simpleUser.fullName,
			};
		}
		return responseData;
	}

	async createUsername(req: Request, usernameData: { username: string }) {
		const user: UserAuth = await this.validationService.createUsername(req, usernameData);

		await this.prismaService.userAuthentication.update({
			where: { id: user.id },
			data: {
				username: usernameData.username,
			},
		});

		return 'Username has been added';
	}

	async refresh(refreshToken: string): Promise<{ accessToken: string }> {
		const user = this.refreshTokenStrategy.verify(refreshToken) as {
			id: string;
		};

		const tokenPayload: { id: string } = {
			id: user.id,
		};
		const accessToken = await this.jwtService.signAsync(tokenPayload);

		return { accessToken };
	}

	async googleLogin(req: Request, res: Response) {
		this.validationService.googleLogin(req);

		const userPaylod = req.user as GoogleUser;

		let googleUser = await this.prismaService.googleUser.findFirst({
			where: {
				googleId: userPaylod.googleId,
			},
		});
		if (googleUser === null) {
			const userAuth = await this.prismaService.userAuthentication.create({
				data: {
					verified: true,
					googleUser: {
						create: {
							googleId: userPaylod.googleId,
							email: userPaylod.email,
							fullName: userPaylod.fullName,
							avatar: userPaylod.avatar,
						},
					},
				},
				include: { googleUser: true },
			});
			googleUser = userAuth.googleUser;
		}
		const accessToken = await this.jwtService.signAsync({
			id: googleUser.id,
		});
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken({
			id: googleUser.id,
		});
		res.redirect(`${process.env.FRONTEND_URL}/?at=${accessToken}&rt=${refreshToken}`);
	}
}
