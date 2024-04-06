import {
	Controller,
	Post,
	Body,
	UseInterceptors,
	UploadedFiles,
	Get,
	UseGuards,
	Req,
	Param,
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/auth/types/user.types';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService,
		private prismaService: PrismaService,
	) {}
	@Get(':id')
	async findOne(@Param() params: { id: string }): Promise<User> {
		return await this.userService.findOne(+params.id);
	}
}
