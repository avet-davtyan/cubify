import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { CubeModule } from './cube/cube.module';

@Module({
	imports: [AuthModule, PrismaModule, CubeModule],
	controllers: [AppController],
})
export class AppModule {}
