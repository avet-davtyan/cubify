import { Injectable, OnModuleDestroy, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisteredUser } from 'src/auth/types/user.types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		this.$connect();
	}
	async onModuleDestroy() {
		this.$disconnect();
	}
}
