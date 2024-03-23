import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { AuthService } from './auth.service';
import { User } from './types/user.types';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@UsePipes(ValidationPipe)
	async regitser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.authService.register(createUserDto);
	}

	@Post('login')
	@UsePipes(ValidationPipe)
	async login(
		@Body() loginUserDto: LoginUserDto,
	): Promise<{ accessToken: string; refreshToken: string }> {
		return await this.authService.login(loginUserDto);
	}

	@Post('refresh')
	async refresh(
		@Body() refreshPayLoad: { refreshToken: string },
	): Promise<{ accessToken: string }> {
		return await this.authService.refresh(refreshPayLoad.refreshToken);
	}
}