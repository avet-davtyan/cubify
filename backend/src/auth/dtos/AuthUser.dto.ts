import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { IsUnique } from './validations/IsUnique.validation';

export class CreateUserDto {
	@IsNotEmpty()
	@MinLength(6, {
		message: 'username must be at least 6 characters',
	})
	@Matches(/^[a-z0-9._]+$/, {
		message: 'Only lowercase letters, numbers, . and _ are allowed',
	})
	@IsUnique({ type: 'username' })
	username: string;

	@IsNotEmpty()
	@IsEmail()
	@IsUnique({ type: 'email' })
	email: string;

	@IsNotEmpty()
	@MinLength(8, {
		message: 'password must be at least 8 characters',
	})
	password: string;
}

export class LoginUserDto {
	@IsNotEmpty()
	emailOrUsername: string;

	@IsNotEmpty()
	password: string;
}
