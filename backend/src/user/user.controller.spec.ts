import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { NotFoundException } from "@nestjs/common";

describe("UserController", () => {
    let controller: UserController;

    const mockUsersService = {
        findOneByUsername: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        mockUsersService.findOneByUsername.mockClear();
        mockUsersService.findOne.mockClear();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("findOneByUsername", () => {
        it("should return user if exists", async () => {
            const resolvedValue = {
                id: "userid",
                email: "email@gmail.com",
                fullName: "Full Name",
                username: "username",
            };
            mockUsersService.findOneByUsername.mockResolvedValue(resolvedValue);
            const result = await controller.findOneByUsername({
                username: "username",
            });
            expect(result).toEqual(resolvedValue);
            expect(mockUsersService.findOneByUsername).toHaveBeenCalledTimes(1);
            expect(mockUsersService.findOneByUsername).toHaveBeenCalledWith("username");
        });

        it("should throw Not found exception", async () => {
            mockUsersService.findOneByUsername.mockImplementation((username: string) => {
                throw new NotFoundException();
            });

            await expect(
                controller.findOneByUsername({
                    username: "nonExistingUsername",
                })
            ).rejects.toThrow(NotFoundException);
            expect(mockUsersService.findOneByUsername).toHaveBeenCalledTimes(1);
            expect(mockUsersService.findOneByUsername).toHaveBeenCalledWith("nonExistingUsername");
        });
    });

    describe("findOne", () => {
        it("should return simpleUser qor googleUser if exists", async () => {
            const simpleUser = {
                id: "userid",
                email: "email@gmail.com",
                fullName: "Full Name",
                username: "username",
            };
            mockUsersService.findOne.mockResolvedValue(simpleUser);
            const result = await controller.findOne({ id: "userId" });
            expect(result).toEqual(simpleUser);
            expect(mockUsersService.findOne).toHaveBeenCalledTimes(1);
            expect(mockUsersService.findOne).toHaveBeenCalledWith("userId");
        });

        it("should throw not found exception if user doesn not exist", async () => {
            mockUsersService.findOne.mockImplementation(() => {
                throw new NotFoundException();
            });

            await expect(controller.findOne({ id: "nonExinstingId" })).rejects.toThrow(NotFoundException);
            expect(mockUsersService.findOne).toHaveBeenCalledTimes(1);
            expect(mockUsersService.findOne).toHaveBeenCalledWith("nonExinstingId");
        });
    });

    describe("searchUsers", () => {});
});
