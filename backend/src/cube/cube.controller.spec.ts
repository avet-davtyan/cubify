import { Test, TestingModule } from "@nestjs/testing";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { MailService } from "src/mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { Cube, LocalAccount } from "@prisma/client";
import { verify } from "crypto";
import { CubeController } from "./cube.controller";
import { CubeService } from "./cube.service";
import { InteractionService } from "./services/interaction.service";

describe("AuthController", () => {
    let controller: CubeController;

    const CubeServiceMock = {
        findOne: jest.fn(),
        getLikedCubes: jest.fn(),
        getCubesWithMostLikes: jest.fn(),
        getCubesMostRecentlyPublished: jest.fn(),
        getCubesByUser: jest.fn(),
        getCubeCount: jest.fn(),
        getUsersCubeCount: jest.fn(),
    };
    const InteractionServiceMock = {
        like: jest.fn(),
        removeLike: jest.fn(),
        isLiked: jest.fn(),
        likeCount: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CubeController],
            providers: [
                {
                    provide: CubeService,
                    useValue: CubeServiceMock,
                },
                {
                    provide: InteractionService,
                    useValue: InteractionServiceMock,
                },
                JwtService,
            ],
        }).compile();

        controller = module.get<CubeController>(CubeController);

        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    describe("findOne", () => {
        it("should return cube", async () => {
            const cube: Cube = {
                id: 1,
                ownerId: "ownerid",
                name: "name",
                pending: false,
                description: "description",
                backgroundColor: "bgColor",
                side1: "1",
                side2: "2",
                side3: "3",
                side4: "4",
                side5: "5",
                side6: "6",
                createdAt: undefined,
            };
            CubeServiceMock.findOne.mockResolvedValue(cube);
            const result = await controller.findOne(1);
            expect(result).toEqual(cube);
            expect(CubeServiceMock.findOne).toHaveBeenCalledTimes(1);
        });
        it("should throw not found exception", async () => {
            CubeServiceMock.findOne.mockImplementation(() => {
                throw new NotFoundException("Cube is not found");
            });
            await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe("getCubesWithMostLikes", () => {
        it("should return cubes with most likes", async () => {
            const cubesWithMostLikes: Cube[] = [
                {
                    id: 1,
                    ownerId: "ownerid",
                    name: "name",
                    pending: false,
                    description: "description",
                    backgroundColor: "bgColor",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
                {
                    id: 2,
                    ownerId: "ownerid2",
                    name: "name2",
                    pending: false,
                    description: "description2",
                    backgroundColor: "bgColor2",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
            ];

            CubeServiceMock.getCubesWithMostLikes.mockResolvedValue(cubesWithMostLikes);
            const result = await controller.getCubesWithMostLikes(1, 9);
            expect(result).toEqual(cubesWithMostLikes);
            expect(CubeServiceMock.getCubesWithMostLikes).toHaveBeenCalledTimes(1);
        });
    });

    describe("getCubesMostRecentlyPublished", () => {
        it("should return recently published cubes", async () => {
            const cubesMostRecentlyPublished: Cube[] = [
                {
                    id: 1,
                    ownerId: "ownerid",
                    name: "name",
                    pending: false,
                    description: "description",
                    backgroundColor: "bgColor",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
                {
                    id: 2,
                    ownerId: "ownerid2",
                    name: "name2",
                    pending: false,
                    description: "description2",
                    backgroundColor: "bgColor2",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
            ];

            CubeServiceMock.getCubesMostRecentlyPublished.mockResolvedValue(cubesMostRecentlyPublished);
            const result = await controller.getCubesMostRecentlyPublished(1, 9);
            expect(result).toEqual(cubesMostRecentlyPublished);
            expect(CubeServiceMock.getCubesMostRecentlyPublished).toHaveBeenCalledTimes(1);
        });
    });

    describe("getLikedCubes", () => {
        it("should return liked cubes", async () => {
            const likedCubes: Cube[] = [
                {
                    id: 1,
                    ownerId: "ownerid",
                    name: "name",
                    pending: false,
                    description: "description",
                    backgroundColor: "bgColor",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
                {
                    id: 2,
                    ownerId: "ownerid2",
                    name: "name2",
                    pending: false,
                    description: "description2",
                    backgroundColor: "bgColor2",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
            ];
            const likes = [
                {
                    cube: likedCubes[0],
                },
                {
                    cube: likedCubes[1],
                },
            ];
            const mockRequest: unknown = {
                payload: { id: "userid" },
            };

            CubeServiceMock.getLikedCubes.mockResolvedValue(likedCubes);
            const result = await controller.getLikedCubes(mockRequest as Request);
            expect(result).toEqual(likedCubes);
        });
    });

    describe("getCubeByUser", () => {
        it("should return cubes of user", async () => {
            const userCubes: Cube[] = [
                {
                    id: 1,
                    ownerId: "ownerid",
                    name: "name",
                    pending: false,
                    description: "description",
                    backgroundColor: "bgColor",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
                {
                    id: 2,
                    ownerId: "ownerid",
                    name: "name2",
                    pending: false,
                    description: "description2",
                    backgroundColor: "bgColor2",
                    side1: "1",
                    side2: "2",
                    side3: "3",
                    side4: "4",
                    side5: "5",
                    side6: "6",
                    createdAt: undefined,
                },
            ];
            CubeServiceMock.getCubesByUser.mockResolvedValue(userCubes);
            const result = await controller.getCubesByUser(1, 9, "ownerid");
            expect(result).toEqual(userCubes);
            expect(CubeServiceMock.getCubesByUser).toHaveBeenCalledTimes(1);
        });
    });
});
