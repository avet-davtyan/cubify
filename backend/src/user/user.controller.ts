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
import { GoogleUser, User } from 'src/auth/types/user.types';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}
	@Get(':id')
	async findOne(@Param() params: { id: string }): Promise<User | GoogleUser> {
		return await this.userService.findOne(params.id);
	}

	@Get('find/:username')
	async findOneByUsername(@Param() params: { username: string }): Promise<User | GoogleUser> {
		return await this.userService.findOneByUsername(params.username);
	}
}
