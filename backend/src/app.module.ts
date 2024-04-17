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
import { MailerModule } from '@nestjs-modules/mailer';
import { RewriteApiEndpointMiddleware } from './auth/middlewares/redirect.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				service: 'gmail',
				host: 'smpt.gmail.com',
				port: 587,
				secure: false,
				// use SSL
				auth: {
					user: 'avetdavtyan04@gmail.com',
					pass: 'Tiezerakan007',
				},
			},
		}),
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
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(RewriteApiEndpointMiddleware) // Apply your custom middleware
			.forRoutes('/');
	}
}
