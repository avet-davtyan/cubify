import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginUserDto } from "../dtos/AuthUser.dto";
import { GoogleAccount, LocalAccount, User } from "@prisma/client";
import { Request } from "express";
import { UserAccountsIncluded } from "../types/user.types";

@Injectable()
export class ValidationService {
    constructor(private prismaService: PrismaService) {}
    async login(loginUserDto: LoginUserDto): Promise<LocalAccount> {
        const user = await this.prismaService.user.findFirst({
            where: {
                username: loginUserDto.emailOrUsername,
            },
            include: { localAccount: true },
        });

        let localAccount;

        if (!user) {
            localAccount = await this.prismaService.localAccount.findFirst({
                where: {
                    email: loginUserDto.emailOrUsername,
                },
            });
            if (user === null) {
                throw new NotFoundException("Wrong username or email");
            }
        } else {
            if (!user.localAccount) {
                throw new BadRequestException("User is registered with other services");
            }
            localAccount = user.localAccount;
        }

        return localAccount;
    }

    async verify(req: Request): Promise<UserAccountsIncluded> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: req["payload"].id,
            },
            include: { localAccount: true, googleAccount: true },
        });

        if (user === null) {
            throw new BadRequestException("User is not found");
        }
        if (!user.verified) {
            throw new ForbiddenException("Please verify your email");
        }

        if (user.username === null) {
            throw new UnprocessableEntityException("Please set a username");
        }

        return user;
    }

    async verifyGoogle(req: Request): Promise<UserAccountsIncluded> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: req["payload"].id,
            },
            include: { googleAccount: true, localAccount: true },
        });
        if (user === null) {
            throw new NotFoundException("User is not found");
        }

        if (user.username !== null) {
            throw new BadRequestException("User already has a username");
        }
        return user;
    }

    async verifyNotVerified(req: Request): Promise<UserAccountsIncluded> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: req["payload"].id,
            },
            include: { googleAccount: true, localAccount: true },
        });
        if (user === null) {
            throw new NotFoundException("User is not found");
        }

        if (user.verified) {
            throw new BadRequestException("User has verified his account");
        }

        return user;
    }

    async createUsername(req: Request, usernameData: { username: string }): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: req["payload"].id,
            },
        });
        if (user === null) {
            throw new NotFoundException("User is not found");
        }

        if (user.username !== null) {
            throw new BadRequestException("User already has a username");
        }

        const existingUser = await this.prismaService.user.findFirst({
            where: {
                username: usernameData.username,
            },
        });

        if (existingUser !== null) {
            throw new UnprocessableEntityException("Username already exists");
        }
        return user;
    }

    googleLogin(req: Request) {
        if (!req.user) {
            throw new UnauthorizedException("User need to be authorized");
        }
    }
}
