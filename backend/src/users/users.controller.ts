import { Controller, Get, UseGuards } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/guards/auth.guard';
config();

@Controller('users')
export class UsersController {
	@UseGuards(AuthGuard)
	@Get()
	get() {
		return 'users';
	}
}
