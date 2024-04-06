import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}
	async findOne(id: number): Promise<User> {
		const _user = await this.prismaService.user.findFirst({
			where: {
				id: id,
			},
		});
		if (_user === null) {
			throw new NotFoundException();
		}
		const user: User = {
			id: _user.id,
			username: _user.username,
			fullName: _user.fullName,
			email: _user.email,
		};
		return user;
	}
}
