import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GoogleAccountResponse, LocalAccoutResponse } from 'src/auth/types/user.types';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('find/:username')
	async findOneByUsername(
		@Param() params: { username: string },
	): Promise<LocalAccoutResponse | GoogleAccountResponse> {
		return await this.userService.findOneByUsername(params.username);
	}

	@Get('search')
	async searchUsers(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number,
		@Query('pageSize') pageSize: number,
	): Promise<Array<LocalAccoutResponse | GoogleAccountResponse>> {
		page = Math.floor(page) || 1;
		pageSize = Math.floor(pageSize) || 20;
		return await this.userService.searchUsers(searchTerm, page, pageSize);
	}

	@Get('searchCount')
	async searchUsersCount(@Query('searchTerm') searchTerm: string): Promise<number> {
		return await this.userService.searchUsersCount(searchTerm);
	}

	@Get(':id')
	async findOne(
		@Param() params: { id: string },
	): Promise<LocalAccoutResponse | GoogleAccountResponse> {
		return await this.userService.findOne(params.id);
	}
}
