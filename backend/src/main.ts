import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

async function bootstrap() {
	dotenv.config();
	console.log(process.env.FRONTEND_URL);
	const app = await NestFactory.create(AppModule);
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	app.enableCors({
		allowedHeaders: '*',
		origin: process.env.FRONTEND_URL,
		credentials: true,
	});
	app.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);

	app.use(bodyParser.json());
	await app.listen(3000);
}
bootstrap();
