import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";
import { UserAccountsIncluded } from "src/auth/types/user.types";
import { PrismaService } from "src/prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private prismaService: PrismaService
    ) {}
    async resendMail(req: Request) {
        const payload = req["payload"] as { id: string };
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.id,
            },
            include: { localAccount: true, googleAccount: true },
        });
        if (user === null) {
            throw new NotFoundException("User is not found");
        }
        if (user.verified) {
            throw new BadRequestException("User is already verified");
        }
        if (user.googleAccount) {
            throw new BadRequestException("User is authenticated with google");
        }

        const verificationToken: string = uuidv4();

        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: { verificationToken },
        });

        await this.mailerService.sendMail({
            to: user.localAccount.email,
            subject: "Verify your email",
            template: "verification",
            context: {
                fullName: user.localAccount.fullName,
                verificationToken: verificationToken,
            },
        });
        return HttpStatus.ACCEPTED;
    }

    async sendMail(user: UserAccountsIncluded) {
        await this.mailerService.sendMail({
            to: user.localAccount.email,
            subject: "Verify your email",
            template: "verification",
            context: {
                backendUrl: process.env.VITE_BACKEND_URL,
                fullName: user.localAccount.fullName,
                verificationToken: user.verificationToken,
            },
        });
    }

    async mailVerify(verificationToken: string, res: Response) {
        const user = await this.prismaService.user.findUnique({
            where: {
                verificationToken,
            },
        });

        if (user === null) {
            throw new NotFoundException("This verification link is no longer available");
        }
        if (user.verified) {
            throw new BadRequestException("This user is already verified");
        }

        await this.prismaService.user.update({
            where: {
                verificationToken,
            },
            data: { verified: true },
        });

        res.redirect(process.env.FRONTEND_URL);
    }
}
