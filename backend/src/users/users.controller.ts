import { Controller, Get } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Controller('users')
export class UsersController {
	@Get()
	get() {
		return process.env.SECRET_KEY;
	}
}
