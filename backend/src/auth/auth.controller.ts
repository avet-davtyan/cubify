import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/RegisterUser.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  @UsePipes(ValidationPipe)
  async regitser(@Body() userData: CreateUserDto): Promise<string | undefined> {
    return userData.username;
  }
}
