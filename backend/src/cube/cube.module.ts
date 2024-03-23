import { Module } from '@nestjs/common';
import { CubeController } from './cube.controller';

@Module({
  controllers: [CubeController]
})
export class CubeModule {}
