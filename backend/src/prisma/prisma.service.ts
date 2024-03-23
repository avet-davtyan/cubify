import { Injectable, OnModuleDestroy, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisteredUser } from 'src/auth/types/user.types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async findUser(emailOrUsername: string): Promise<RegisteredUser> {
		let user = await this.user.findFirst({
			where: {
				username: emailOrUsername,
			},
		});
		if (!user) {
			user = await this.user.findFirst({
				where: {
					email: emailOrUsername,
				},
			});
			if (!user) {
				throw new UnauthorizedException('Unauthorized');
			}
		}
		return user;
	}

	async onModuleInit() {
		this.$connect();
	}
	async onModuleDestroy() {
		this.$disconnect();
	}
}
