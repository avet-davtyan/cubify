import { Test, TestingModule } from "@nestjs/testing";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dtos/AuthUser.dto";
import { JwtService } from "@nestjs/jwt";
import { GoogleAccountResponse, LocalAccoutResponse } from "./types/user.types";
describe("AuthController", () => {
    let controller: AuthController;

    const AuthServiceMock = {
        register: jest.fn(),
        login: jest.fn(),
        verify: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: AuthServiceMock,
                },

                JwtService,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);

        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("register", () => {
        it("shoud not throw an error if provided user credentials are ok", async () => {
            const createUserDto: CreateUserDto = {
                username: "username",
                email: "email@gmail.com",
                fullName: "full Name",
                password: "password",
            };

            AuthServiceMock.register.mockImplementation();
            await expect(() => controller.register(createUserDto)).not.toThrow();
            expect(AuthServiceMock.register).toHaveBeenCalledTimes(1);
        });

        it("should throw and error if something is missing in user credentials", async () => {
            const createUserDto = {
                username: null,
                email: "email@gmail.com",
                fullName: "full Name",
                password: "password",
            };
            AuthServiceMock.register.mockImplementation(() => {
                throw new InternalServerErrorException();
            });

            await expect(controller.register(createUserDto)).rejects.toThrow(InternalServerErrorException);
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

            AuthServiceMock.login.mockResolvedValue(expectedResult);

            const result = await controller.login(loginUserDto);
            expect(result).toEqual(expectedResult);
            expect(AuthServiceMock.login).toHaveBeenCalledTimes(1);
        });
        it("should throw and error if user is not found or password is incorrect", async () => {
            const loginUserDto: LoginUserDto = {
                emailOrUsername: "username",
                password: "password",
            };
            AuthServiceMock.login.mockImplementation(() => {
                throw new NotFoundException();
            });
            await expect(controller.login(loginUserDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe("verify", () => {
        it("should return a GoogleAccount", async () => {
            const expectedResult: GoogleAccountResponse = {
                id: "userid",
                fullName: "Full Name",
                email: "email@gmail.com",
                googleId: "googleId",
                avatar: null,
            };

            AuthServiceMock.verify.mockResolvedValue(expectedResult);
            const result = await controller.verify(null);
            expect(result).toEqual(expectedResult);
            expect(AuthServiceMock.verify).toHaveBeenCalledTimes(1);
        });
        it("should return a LocalAccount", async () => {
            const expectedResult: LocalAccoutResponse = {
                id: "userid",
                fullName: "Full Name",
                email: "email@gmail.com",
                username: "username",
            };

            AuthServiceMock.verify.mockResolvedValueOnce(expectedResult);
            const result = await controller.verify(null);
            expect(result).toEqual(expectedResult);
            expect(AuthServiceMock.verify).toHaveBeenCalledTimes(1);
        });
    });
});
