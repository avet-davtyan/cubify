import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleUser, User } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}
	async findOne(id: string): Promise<User | GoogleUser> {
		const _user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: id,
			},
			include: { simpleUser: true, googleUser: true },
		});
		if (_user === null) {
			throw new NotFoundException();
		}
		if (_user.simpleUser) {
			const user: User = {
				id: _user.id,
				username: _user.username,
				fullName: _user.simpleUser.fullName,
				email: _user.simpleUser.email,
			};
			return user;
		}
		if (_user.googleUser) {
			const user: GoogleUser = {
				id: _user.id,
				googleId: _user.googleUser.googleId,
				fullName: _user.googleUser.fullName,
				email: _user.googleUser.email,
				avatar: _user.googleUser.avatar,
				username: _user.username,
			};
			return user;
		}
	}

	async findOneByUsername(username: string): Promise<User | GoogleUser> {
		const _user = await this.prismaService.userAuthentication.findFirst({
			where: {
				username: username,
			},
			include: { simpleUser: true, googleUser: true },
		});

		if (_user === null) {
			throw new NotFoundException();
		}

		if (_user.simpleUser) {
			const user: User = {
				id: _user.id,
				username: _user.username,
				fullName: _user.simpleUser.fullName,
				email: _user.simpleUser.email,
			};
			return user;
		}
		if (_user.googleUser) {
			const user: GoogleUser = {
				id: _user.id,
				googleId: _user.googleUser.googleId,
				fullName: _user.googleUser.fullName,
				email: _user.googleUser.email,
				avatar: _user.googleUser.avatar,
				username: _user.username,
			};
			return user;
		}
	}
}
