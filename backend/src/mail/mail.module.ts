import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: 'smtp.gmail.com',
				auth: {
					user: 'cubify435@gmail.com',
					pass: 'fupfroljxfjhfseg',
				},
			},
			template: {
				dir: __dirname + '/../../templates',
				adapter: new HandlebarsAdapter(),
			},
		}),
	],
	providers: [MailService],
	controllers: [MailController],
})
export class MailModule {}
