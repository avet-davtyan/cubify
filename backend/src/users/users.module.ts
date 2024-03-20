import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
