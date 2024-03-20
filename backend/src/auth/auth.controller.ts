import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dtos/RegisterUser.dto'
import { AuthService } from './auth.service'
import { User } from './types/user.types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async regitser(@Body() createUserDto: CreateUserDto): Promise<User | undefined> {
    return this.authService.register(createUserDto)
  }
}
