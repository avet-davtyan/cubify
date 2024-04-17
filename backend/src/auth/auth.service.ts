import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { GoogleUser, User } from './types/user.types';
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
		const user = await this.prismaService.userAuthentication.create({
			data: {
				simpleUser: {
					create: {
						...createUserDto,
						password: hashedPassword,
					},
				},
			},
			include: { simpleUser: true },
		});

		const reqUser: User = {
			id: user.id,
			email: user.simpleUser.email,
			username: user.simpleUser.username,
			fullName: user.simpleUser.fullName,
		};

		return reqUser;
	}

	async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
		let user = await this.prismaService.user.findFirst({
			where: {
				username: loginUserDto.emailOrUsername,
			},
		});
		if (!user) {
			user = await this.prismaService.user.findFirst({
				where: {
					email: loginUserDto.emailOrUsername,
				},
			});
			if (!user) {
				throw new UnauthorizedException('Unauthorized');
			}
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

		if (user.googleUser) {
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
			const reqUser: User = {
				id: user.id,
				email: user.simpleUser.email,
				username: user.simpleUser.username,
				fullName: user.simpleUser.fullName,
			};
			return reqUser;
		}
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
		console.log(accessToken);
		const refreshToken = await this.refreshTokenStrategy.generateRefreshToken({
			id: userInDb.id,
		});
		res.redirect(`http://localhost:2950/?at=${accessToken}&rt=${refreshToken}`);
	}
}
