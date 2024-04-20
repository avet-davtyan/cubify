import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IsUniqueValidation } from './dtos/validations/IsUnique.validation';
import { PassService } from './services/pass.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { MailService } from 'src/mail/mail.service';
import { ValidationService } from './services/validation.service';

@Global()
@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.accessExpireTime },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		PassService,
		IsUniqueValidation,
		RefreshTokenStrategy,
		GoogleStrategy,
		MailService,
		ValidationService,
	],
})
export class AuthModule {}
