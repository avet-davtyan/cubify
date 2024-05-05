import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GoogleAccountResponse, LocalAccoutResponse } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}
	async findOne(id: string): Promise<LocalAccoutResponse | GoogleAccountResponse> {
		const _user = await this.prismaService.user.findUnique({
			where: {
				id: id,
				verified: true,
			},
			include: { localAccount: true, googleAccount: true },
		});
		if (_user === null) {
			throw new NotFoundException();
		}
		if (_user.localAccount) {
			const user: LocalAccoutResponse = {
				id: _user.id,
				username: _user.username,
				fullName: _user.localAccount.fullName,
				email: _user.localAccount.email,
			};
			return user;
		}
		if (_user.googleAccount) {
			const user: GoogleAccountResponse = {
				id: _user.id,
				googleId: _user.googleAccount.googleId,
				fullName: _user.googleAccount.fullName,
				email: _user.googleAccount.email,
				avatar: _user.googleAccount.avatar,
				username: _user.username,
			};
			return user;
		}
	}

	async findOneByUsername(username: string): Promise<LocalAccoutResponse | GoogleAccountResponse> {
		const _user = await this.prismaService.user.findUnique({
			where: {
				username: username,
				verified: true,
			},
			include: { localAccount: true, googleAccount: true },
		});

		if (_user === null) {
			throw new NotFoundException();
		}

		if (_user.localAccount) {
			const user: LocalAccoutResponse = {
				id: _user.id,
				username: _user.username,
				fullName: _user.localAccount.fullName,
				email: _user.localAccount.email,
			};
			return user;
		}
		if (_user.googleAccount) {
			const user: GoogleAccountResponse = {
				id: _user.id,
				googleId: _user.googleAccount.googleId,
				fullName: _user.googleAccount.fullName,
				email: _user.googleAccount.email,
				avatar: _user.googleAccount.avatar,
				username: _user.username,
			};
			return user;
		}
	}

	async searchUsers(
		searchTerm: string,
		page: number,
		pageSize: number,
	): Promise<Array<LocalAccoutResponse | GoogleAccountResponse>> {
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
		let users = await this.prismaService.user.findMany({
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
				localAccount: true,
				googleAccount: true,
			},
		});

		const _users = users.map((user) => {
			if (user.localAccount) {
				const _user: LocalAccoutResponse = {
					id: user.id,
					username: user.username,
					fullName: user.localAccount.fullName,
					email: user.localAccount.email,
				};
				return _user;
			}
			if (user.googleAccount) {
				const _user: GoogleAccountResponse = {
					id: user.id,
					googleId: user.googleAccount.googleId,
					fullName: user.googleAccount.fullName,
					email: user.googleAccount.email,
					avatar: user.googleAccount.avatar,
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
		const count = await this.prismaService.user.count({
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
