import { IsEmail, IsNotEmpty, IsStrongPassword, Validate } from 'class-validator';
import { IsUnique } from './validations/IsUnique.validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsUnique({ type: 'username' })
	username: string;

	@IsNotEmpty()
	@IsEmail()
	@IsUnique({ type: 'email' })
	email: string;

	@IsNotEmpty()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minNumbers: 1,
		minUppercase: 1,
	})
	password: string;
}

export class LoginUserDto {
	@IsNotEmpty()
	usernameOrEmail: string;
}
