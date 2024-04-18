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

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private mailerService: MailerService,
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
	@Post('createUsername')
	async createUsername(@Req() req, @Body() usernameData: { username: string }) {
		return this.authService.createUsername(req, usernameData);
	}

	@Get('send-mail')
	async sendMail() {
		console.log('start sending');
		await this.mailerService.sendMail({
			to: 'avetdavtyan04@gmail.com',
			subject: 'Verify Your Email Address',
			template: 'verification',
			context: {
				verificationLink: 'aaaa',
			},
		});
		return 'ok	';
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
