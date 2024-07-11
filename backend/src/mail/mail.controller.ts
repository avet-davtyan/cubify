import { Controller, Get, UseGuards, Req, Param, Res } from "@nestjs/common";
import { MailService } from "./mail.service";
import { AuthGuardJWT } from "src/auth/guards/auth.guard";

@Controller("mail")
export class MailController {
    constructor(private mailService: MailService) {}

    @UseGuards(AuthGuardJWT)
    @Get("resend")
    async resendMail(@Req() req) {
        return await this.mailService.resendMail(req);
    }

    @Get("verify/:verificationToken")
    async mailVerify(@Param() params: { verificationToken: string }, @Res() res) {
        return await this.mailService.mailVerify(params.verificationToken, res);
    }
}
