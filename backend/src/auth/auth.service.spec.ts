import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../src/prisma/prisma.service";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GoogleAccount, LocalAccount, User } from "@prisma/client";
import { GoogleAccountResponse, LocalAccoutResponse, UserAccountsIncluded } from "src/auth/types/user.types";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dtos/AuthUser.dto";
import { PassService } from "./services/pass.service";
import { MailService } from "src/mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { RefreshTokenStrategy } from "./refreshToken.strategy";
import { ValidationService } from "./services/validation.service";
const prismaMock = {
    localAccount: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
    },
    user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
    },
};

const passServiceMock = {
    hash: jest.fn(),
    compare: jest.fn(),
};

const mailServiceMock = {
    sendMail: jest.fn(),
};

const jwtServiceMock = {
    signAsync: jest.fn(),
};

const refreshTokenStrategyMock = {
    generateRefreshToken: jest.fn(),
    verify: jest.fn(),
};

const validationServiceMock = {
    login: jest.fn(),
    verify: jest.fn(),
};

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
                {
                    provide: PassService,
                    useValue: passServiceMock,
                },
                {
                    provide: MailService,
                    useValue: mailServiceMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
                {
                    provide: RefreshTokenStrategy,
                    useValue: refreshTokenStrategyMock,
                },
                {
                    provide: ValidationService,
                    useValue: validationServiceMock,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("register", () => {
        it("shoud not throw an error if provided user credentials are ok", async () => {
            const createUserDto: CreateUserDto = {
                username: "username",
                email: "email@gmail.com",
                fullName: "full Name",
                password: "password",
            };

            const resolvedValue: UserAccountsIncluded = {
                username: "username",
                id: "userid",
                verified: false,
                verificationToken: "verificationToken",
                localAccount: {
                    email: "email@gmail.com",
                    fullName: "Full Name",
                    password: "hashedPassword",
                    id: "userid",
                },
            };
            passServiceMock.hash.mockResolvedValue("hashedPassord");
            prismaMock.user.create.mockResolvedValue(resolvedValue);
            mailServiceMock.sendMail.mockImplementation();

            await expect(() => service.register(createUserDto)).not.toThrow();
            expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
        });
        it("should throw and error if something is missing in user credentials", async () => {
            const createUserDto = {
                username: null,
                email: "email@gmail.com",
                fullName: "full Name",
                password: "password",
            };
            passServiceMock.hash.mockResolvedValue("hashedPassword");
            prismaMock.user.create.mockImplementation(() => {
                throw new InternalServerErrorException();
            });

            await expect(service.register(createUserDto)).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe("login", () => {
        it("should return accessToken and refreshToken", async () => {
            const loginUserDto: LoginUserDto = {
                emailOrUsername: "username",
                password: "password",
            };
            const expectedResult = {
                accessToken: "accessToken",
                refreshToken: "refreshToken",
            };
            const localAccount: LocalAccount = {
                id: "userid",
                email: "email@gmail.com",
                fullName: "Full Name",
                password: "password",
            };
            passServiceMock.compare.mockImplementation();
            validationServiceMock.login.mockResolvedValue(localAccount);
            jwtServiceMock.signAsync.mockResolvedValue("accessToken");
            refreshTokenStrategyMock.generateRefreshToken.mockResolvedValue("refreshToken");

            const result = await service.login(loginUserDto);
            expect(result).toEqual(expectedResult);
            expect(passServiceMock.compare).toHaveBeenCalledTimes(1);
            expect(validationServiceMock.login).toHaveBeenCalledTimes(1);
            expect(jwtServiceMock.signAsync).toHaveBeenCalledTimes(1);
            expect(refreshTokenStrategyMock.generateRefreshToken).toHaveBeenCalledTimes(1);
        });
        it("should throw and error if user is not found", async () => {
            const loginUserDto: LoginUserDto = {
                emailOrUsername: "username",
                password: "password",
            };
            validationServiceMock.login.mockImplementation(() => {
                throw new NotFoundException();
            });
            await expect(service.login(loginUserDto)).rejects.toThrow(NotFoundException);
            expect(passServiceMock.compare).not.toHaveBeenCalled();
            expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
            expect(refreshTokenStrategyMock.generateRefreshToken).not.toHaveBeenCalled();
        });
        it("should throw and error if password is incorrect", async () => {
            const loginUserDto: LoginUserDto = {
                emailOrUsername: "username",
                password: "password1",
            };
            const localAccount: LocalAccount = {
                id: "userid",
                email: "email@gmail.com",
                fullName: "Full Name",
                password: "password2",
            };
            validationServiceMock.login.mockResolvedValue(localAccount);
            passServiceMock.compare.mockImplementation(() => {
                throw new BadRequestException();
            });
            await expect(service.login(loginUserDto)).rejects.toThrow(BadRequestException);
            expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
            expect(refreshTokenStrategyMock.generateRefreshToken).not.toHaveBeenCalled();
        });
    });

    describe("verify", () => {
        it("should return a GoogleAccount", async () => {
            const user: UserAccountsIncluded = {
                id: "userid",
                username: "username",
                verified: true,
                verificationToken: "verificationToken",
                googleAccount: {
                    id: "userid",
                    fullName: "Full Name",
                    email: "email@gmail.com",
                    googleId: "googleId",
                    avatar: null,
                },
            };
            const expectedResult: GoogleAccountResponse = {
                id: "userid",
                fullName: "Full Name",
                email: "email@gmail.com",
                googleId: "googleId",
                avatar: null,
            };

            validationServiceMock.verify.mockResolvedValue(user);
            const result = await service.verify(null);
            expect(result).toEqual(expectedResult);
            expect(validationServiceMock.verify).toHaveBeenCalledTimes(1);
        });
        it("should return a LocalAccount", async () => {
            const user: UserAccountsIncluded = {
                id: "userid",
                username: "username",
                verified: true,
                verificationToken: "verificationToken",
                localAccount: {
                    id: "userid",
                    fullName: "Full Name",
                    email: "email@gmail.com",
                    password: "password",
                },
            };
            const expectedResult: LocalAccoutResponse = {
                id: "userid",
                fullName: "Full Name",
                email: "email@gmail.com",
                username: "username",
            };

            validationServiceMock.verify.mockResolvedValue(user);
            const result = await service.verify(null);
            expect(result).toEqual(expectedResult);
            expect(validationServiceMock.verify).toHaveBeenCalledTimes(1);
        });
    });
});
