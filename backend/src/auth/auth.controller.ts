import {
	Controller,
	Post,
	Get,
	Body,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	Res,
	Redirect,
	Put,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos/AuthUser.dto';
import { AuthService } from './auth.service';
import { User } from './types/user.types';
import { AuthGuardJWT } from './guards/auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private mailService: MailService,
	) {}

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

	@UseGuards(AuthGuardJWT)
	@Post('verify')
	async verify(@Req() req) {
		return this.authService.verify(req);
	}

	@UseGuards(AuthGuardJWT)
	@Post('verifyGoogle')
	async verifyGoogle(@Req() req) {
		return this.authService.verifyGoogle(req);
	}

	@UseGuards(AuthGuardJWT)
	@Post('verifyNotVerified')
	async verifyNotVerified(@Req() req) {
		return this.authService.verifyNotVerified(req);
	}

	@UseGuards(AuthGuardJWT)
	@Post('createUsername')
	async createUsername(@Req() req, @Body() usernameData: { username: string }) {
		return this.authService.createUsername(req, usernameData);
	}

	@Post('refresh')
	async refresh(
		@Body() refreshPayLoad: { refreshToken: string },
	): Promise<{ accessToken: string }> {
		return await this.authService.refresh(refreshPayLoad.refreshToken);
	}

	@Get('/google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {}

	@Get('/google/callback')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req, @Res() res) {
		return this.authService.googleLogin(req, res);
	}
}
