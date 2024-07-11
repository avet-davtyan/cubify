import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "./dtos/AuthUser.dto";
import { GoogleAccountResponse, LocalAccoutResponse, UserAccountsIncluded } from "./types/user.types";
import { PassService } from "./services/pass.service";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenStrategy } from "./refreshToken.strategy";
import { Request, Response } from "express";
import { MailService } from "src/mail/mail.service";
import { ValidationService } from "./services/validation.service";
import { GoogleAccount, LocalAccount } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private passService: PassService,
        private jwtService: JwtService,
        private refreshTokenStrategy: RefreshTokenStrategy,
        private mailService: MailService,
        private validationService: ValidationService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const hashedPassword = await this.passService.hash(createUserDto.password);
        const user = await this.prismaService.user.create({
            data: {
                username: createUserDto.username,
                localAccount: {
                    create: {
                        email: createUserDto.email,
                        fullName: createUserDto.fullName,
                        password: hashedPassword,
                    },
                },
            },
            include: { localAccount: true },
        });

        await this.mailService.sendMail(user);

        return "User is registered";
    }

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
        const localAccount: LocalAccount = await this.validationService.login(loginUserDto);
        await this.passService.compare(loginUserDto.password, localAccount.password);

        const tokenPayload: { id: string } = {
            id: localAccount.id,
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        const refreshToken = await this.refreshTokenStrategy.generateRefreshToken(tokenPayload);

        return {
            accessToken,
            refreshToken,
        };
    }

    async verify(req: Request) {
        const user: UserAccountsIncluded = await this.validationService.verify(req);

        let responseData: LocalAccoutResponse | GoogleAccountResponse;

        if (user.googleAccount) {
            responseData = {
                id: user.id,
                email: user.googleAccount.email,
                fullName: user.googleAccount.fullName,
                googleId: user.googleAccount.googleId,
                avatar: user.googleAccount.avatar,
                username: user.username,
            };
        }
        if (user.localAccount) {
            responseData = {
                id: user.id,
                email: user.localAccount.email,
                username: user.username,
                fullName: user.localAccount.fullName,
            };
        }

        return responseData;
    }

    async verifyGoogle(req: Request) {
        const user: UserAccountsIncluded = await this.validationService.verifyGoogle(req);

        let responseData: { fullName: string; avatar?: string };

        if (user.googleAccount) {
            responseData = {
                fullName: user.googleAccount.fullName,
                avatar: user.googleAccount.avatar,
            };
        }
        if (user.localAccount) {
            responseData = {
                fullName: user.localAccount.fullName,
            };
        }

        return responseData;
    }

    async verifyNotVerified(req: Request) {
        const user: UserAccountsIncluded = await this.validationService.verifyNotVerified(req);

        let responseData: { fullName: string };
        if (user.googleAccount) {
            responseData = {
                fullName: user.googleAccount.fullName,
            };
        }
        if (user.localAccount) {
            responseData = {
                fullName: user.localAccount.fullName,
            };
        }
        return responseData;
    }

    async createUsername(req: Request, usernameData: { username: string }) {
        const user: UserAccountsIncluded = await this.validationService.createUsername(req, usernameData);

        await this.prismaService.user.update({
            where: { id: user.id },
            data: {
                username: usernameData.username,
            },
        });

        return "Username has been added";
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string }> {
        const user = this.refreshTokenStrategy.verify(refreshToken) as {
            id: string;
        };

        const tokenPayload: { id: string } = {
            id: user.id,
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { accessToken };
    }

    async googleLogin(req: Request, res: Response) {
        this.validationService.googleLogin(req);

        const userPaylod = req.user as GoogleAccount;

        let googleAccount = await this.prismaService.googleAccount.findFirst({
            where: {
                googleId: userPaylod.googleId,
            },
        });
        if (googleAccount === null) {
            const user = await this.prismaService.user.create({
                data: {
                    verified: true,
                    googleAccount: {
                        create: {
                            googleId: userPaylod.googleId,
                            email: userPaylod.email,
                            fullName: userPaylod.fullName,
                            avatar: userPaylod.avatar,
                        },
                    },
                },
                include: { googleAccount: true },
            });
            googleAccount = user.googleAccount;
        }
        const accessToken = await this.jwtService.signAsync({
            id: googleAccount.id,
        });
        const refreshToken = await this.refreshTokenStrategy.generateRefreshToken({
            id: googleAccount.id,
        });
        res.redirect(`${process.env.FRONTEND_URL}/?at=${accessToken}&rt=${refreshToken}`);
    }
}
