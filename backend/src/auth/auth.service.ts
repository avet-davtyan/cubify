import {
	BadRequestException,
	ConflictException,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { GoogleUser, User } from './types/user.types';
import { PassService } from './services/pass.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { Headers } from '@nestjs/common';
import { Request } from 'express';
import { UserAuthentication } from '@prisma/client';

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

		const reqUser: User = {
			id: user.id,
			email: user.simpleUser.email,
			username: user.username,
			fullName: user.simpleUser.fullName,
		};

		return reqUser;
	}

	async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
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
			if (!user) {
				throw new BadRequestException();
			}
		} else {
			if (!userAuth.simpleUser) {
				throw new BadRequestException();
			}
			user = userAuth.simpleUser;
		}

		await this.passService.compare(loginUserDto.password, user.password);

		const reqUser: { id: string } = {
			id: user.id,
		};
		const accessToken = await this.jwtService.signAsync(reqUser);
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken(reqUser);

		return {
			accessToken,
			refreshToken,
		};
	}

	async verify(req: Request) {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
			include: { simpleUser: true, googleUser: true },
		});

		if (user === null) {
			throw new BadRequestException();
		}
		if (user.googleUser) {
			if (user.username === null) {
				throw new HttpException('Please set username', HttpStatus.UNPROCESSABLE_ENTITY);
			}
			const reqUser: GoogleUser = {
				id: user.id,
				email: user.googleUser.email,
				fullName: user.googleUser.fullName,
				googleId: user.googleUser.googleId,
				avatar: user.googleUser.avatar,
			};
			return reqUser;
		}
		if (user.simpleUser) {
			if (user.username === null) {
				throw new HttpException('Please set username', HttpStatus.UNPROCESSABLE_ENTITY);
			}
			const reqUser: User = {
				id: user.id,
				email: user.simpleUser.email,
				username: user.username,
				fullName: user.simpleUser.fullName,
			};
			return reqUser;
		}
	}

	async verifyGoogle(req: Request) {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
			include: { googleUser: true, simpleUser: true },
		});
		if (user === null) {
			throw new BadRequestException();
		}

		if (user.username !== null) {
			throw new BadRequestException();
		}
		if (user.googleUser) {
			const reqUser: { fullName: string; avatar: string } = {
				fullName: user.googleUser.fullName,
				avatar: user.googleUser.avatar,
			};
			return reqUser;
		}
		if (user.simpleUser) {
			const reqUser: { fullName: string } = {
				fullName: user.simpleUser.fullName,
			};
			return reqUser;
		}
	}

	async createUsername(req: Request, usernameData: { username: string }) {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: req['payload'].id,
			},
		});
		if (user === null) {
			throw new BadRequestException();
		}

		if (user.username !== null) {
			throw new BadRequestException();
		}
		const existingUser = await this.prismaService.userAuthentication.findFirst({
			where: {
				username: usernameData.username,
			},
		});

		if (existingUser !== null) {
			throw new UnprocessableEntityException('username already exists');
		}

		const userWithUsername = await this.prismaService.userAuthentication.update({
			where: { id: user.id },
			data: {
				username: usernameData.username,
			},
		});

		return userWithUsername;
	}

	async refresh(refreshToken: string): Promise<{ accessToken: string }> {
		const user = this.refreshTokenStrategy.verify(refreshToken) as { id: string };

		const reqUser: { id: string } = {
			id: user.id,
		};
		const accessToken = await this.jwtService.signAsync(reqUser);

		return { accessToken };
	}

	async googleLogin(req, res) {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const user = req.user as GoogleUser;
		let userInDb = await this.prismaService.googleUser.findFirst({
			where: {
				googleId: user.googleId,
			},
		});
		if (userInDb === null) {
			const _user = await this.prismaService.userAuthentication.create({
				data: {
					googleUser: {
						create: {
							googleId: user.googleId,
							email: user.email,
							fullName: user.fullName,
							avatar: user.avatar,
						},
					},
				},
				include: { googleUser: true },
			});
			userInDb = _user.googleUser;
		}
		const accessToken = await this.jwtService.signAsync({
			id: userInDb.id,
		});
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken({
			id: userInDb.id,
		});
		res.redirect(`http://localhost:2950/?at=${accessToken}&rt=${refreshToken}`);
	}
}
