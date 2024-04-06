import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CubeModule } from './cube/cube.module';
import { join } from 'path';
import { AuthMiddleware } from './app.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		AuthModule,
		PrismaModule,
		CubeModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'cube_images'),
			serveRoot: '/cube_images',
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [UserService],
})
export class AppModule {
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(AuthMiddleware) // Apply your custom middleware
	// 		.forRoutes({ path: '/cube_images/*', method: RequestMethod.ALL });
	// }
}
