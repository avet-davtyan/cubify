import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleUser, User, UserAuth } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MailService {
	constructor(
		private mailerService: MailerService,
		private prismaService: PrismaService,
	) {}
	async resendMail(req: Request) {
		const payload = req['payload'] as { id: string };
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				id: payload.id,
			},
			include: { simpleUser: true, googleUser: true },
		});
		if (user === null) {
			throw new NotFoundException('User is not found');
		}
		if (user.verified) {
			throw new BadRequestException('User is already verified');
		}
		if (user.googleUser) {
			throw new BadRequestException('User is authenticated with google');
		}

		const verificationToken: string = uuidv4();

		const newTokenUser = await this.prismaService.userAuthentication.update({
			where: {
				id: user.id,
			},
			data: { verificationToken },
		});

		await this.mailerService.sendMail({
			to: user.simpleUser.email,
			subject: 'Verify your email',
			template: 'verification',
			context: {
				fullName: user.simpleUser.fullName,
				verificationToken: verificationToken,
			},
		});
		return HttpStatus.ACCEPTED;
	}

	async sendMail(user: UserAuth) {
		await this.mailerService.sendMail({
			to: user.simpleUser.email,
			subject: 'Verify your email',
			template: 'verification',
			context: {
				fullName: user.simpleUser.fullName,
				verificationToken: user.verificationToken,
			},
		});
	}

	async mailVerify(verificationToken: string, res: Response) {
		const user = await this.prismaService.userAuthentication.findFirst({
			where: {
				verificationToken,
			},
		});

		if (user === null) {
			throw new NotFoundException('This verification link is no longer available');
		}
		if (user.verified) {
			throw new BadRequestException('This user is already verified');
		}

		await this.prismaService.userAuthentication.update({
			where: {
				verificationToken,
			},
			data: { verified: true },
		});

		res.redirect('http://localhost:2950/');
	}
}
