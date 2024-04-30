import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GoogleUser, User } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}
	async findOne(id: string): Promise<User | GoogleUser> {
		const _user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: id,
				verified: true,
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
				verified: true,
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

	async searchUsers(
		searchTerm: string,
		page: number,
		pageSize: number,
	): Promise<Array<User | GoogleUser>> {
		const specialChars = [' ', '.', '_'];
		let searchParts = [searchTerm];

		specialChars.forEach((char) => {
			const newParts: string[] = [];
			searchParts.forEach((part) => {
				newParts.push(...part.split(char).filter(Boolean));
			});
			searchParts = newParts;
		});

		const conditions = searchParts.map((searchPart) => ({
			OR: [
				{
					username: {
						contains: searchPart,
					},
				},
				{
					simpleUser: {
						fullName: {
							contains: searchPart,
						},
					},
				},
				{
					googleUser: {
						fullName: {
							contains: searchPart,
						},
					},
				},
			],
		}));
		if (conditions.length === 0) {
			throw new BadRequestException('Plaese provide more search information');
		}
		let users = await this.prismaService.userAuthentication.findMany({
			take: pageSize,
			skip: (page - 1) * pageSize,
			where: {
				AND: searchParts.map((searchPart) => ({
					OR: [
						{
							username: {
								contains: searchPart,
							},
						},
						{
							simpleUser: {
								fullName: {
									contains: searchPart,
								},
							},
						},
						{
							googleUser: {
								fullName: {
									contains: searchPart,
								},
							},
						},
					],
				})),
			},
			include: {
				simpleUser: true,
				googleUser: true,
			},
		});

		const _users = users.map((user) => {
			if (user.simpleUser) {
				const _user: User = {
					id: user.id,
					username: user.username,
					fullName: user.simpleUser.fullName,
					email: user.simpleUser.email,
				};
				return _user;
			}
			if (user.googleUser) {
				const _user: GoogleUser = {
					id: user.id,
					googleId: user.googleUser.googleId,
					fullName: user.googleUser.fullName,
					email: user.googleUser.email,
					avatar: user.googleUser.avatar,
					username: user.username,
				};
				return _user;
			}
		});

		return _users;
	}

	async searchUsersCount(searchTerm: string): Promise<number> {
		const specialChars = [' ', '.', '_'];
		let searchParts = [searchTerm];

		specialChars.forEach((char) => {
			const newParts: string[] = [];
			searchParts.forEach((part) => {
				newParts.push(...part.split(char).filter(Boolean));
			});
			searchParts = newParts;
		});

		const conditions = searchParts.map((searchPart) => ({
			OR: [
				{
					username: {
						contains: searchPart,
					},
				},
				{
					simpleUser: {
						fullName: {
							contains: searchPart,
						},
					},
				},
				{
					googleUser: {
						fullName: {
							contains: searchPart,
						},
					},
				},
			],
		}));
		if (conditions.length === 0) {
			throw new BadRequestException('Plaese provide more search information');
		}
		const count = await this.prismaService.userAuthentication.count({
			where: {
				AND: searchParts.map((searchPart) => ({
					OR: [
						{
							username: {
								contains: searchPart,
							},
						},
						{
							simpleUser: {
								fullName: {
									contains: searchPart,
								},
							},
						},
						{
							googleUser: {
								fullName: {
									contains: searchPart,
								},
							},
						},
					],
				})),
			},
		});

		return count;
	}
}
