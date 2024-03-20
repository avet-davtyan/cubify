import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string
}
