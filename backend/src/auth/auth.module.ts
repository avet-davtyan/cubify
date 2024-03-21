import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsernameEmailValidation } from './dtos/validations/IsUnique.validator';
import { PassService } from './pass/pass.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, PassService, UsernameEmailValidation],
})
export class AuthModule {}
