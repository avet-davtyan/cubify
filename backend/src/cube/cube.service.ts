import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCubeBodyDto, CreateCubeFilesDto } from "./dtos/CreateCube.dto";
import { CubeResponse } from "./types/cube.types";
import { Request } from "express";
import { join, extname } from "path";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from "fs";
import { S3Service } from "./services/s3.service";

@Injectable()
export class CubeService {
    constructor(
        private prismaService: PrismaService,
        private s3Service: S3Service
    ) {}

    async createCube(createCubeFilesDto: CreateCubeFilesDto, createCubeBodyDto: CreateCubeBodyDto, request: Request) {
        const payload = request["payload"] as { id: string };

        for (const image in createCubeFilesDto) {
            if (this.extensions.includes(extname(createCubeFilesDto[image][0].originalname))) {
                throw new HttpException(`${image} has a wrong extension`, HttpStatus.BAD_REQUEST);
            }
            if (createCubeFilesDto[image][0].size > 1024 * 1024) {
                throw new HttpException(`${image} is too large`, HttpStatus.PAYLOAD_TOO_LARGE);
            }
        }

        const createdCube = await this.prismaService.cube.create({
            data: {
                owner: { connect: { id: payload.id } },
                name: createCubeBodyDto.name,
                description: createCubeBodyDto.description,
                backgroundColor: createCubeBodyDto.backgroundColor,
            },
        });

        const cubeId = createdCube.id.toString();

        const cubeDir = join(process.env.CUBE_IMAGES, createdCube.id.toString());

        try {
            // await fs.mkdirSync(cubeDir, { recursive: true });

            for (const image in createCubeFilesDto) {
                const fileName = `${cubeId}_${image}.jpg`;
                const objectUrl = await this.s3Service.putObject(createCubeFilesDto[image][0], fileName);

                // const imageDir = image + ".jpg";
                // const imagePath = join(cubeDir, imageDir);
                // const imagePathDb = join(createdCube.id.toString(), imageDir);

                // await fs.writeFileSync(imagePath, createCubeFilesDto[image][0].buffer);

                await this.prismaService.cube.update({
                    where: {
                        id: createdCube.id,
                    },
                    data: {
                        [this.sideImageMap[image]]: objectUrl,
                    },
                });
            }

            const cube = await this.prismaService.cube.update({
                where: {
                    id: createdCube.id,
                },
                data: {
                    pending: false,
                },
            });
            return cube;
        } catch (error) {
            console.error("Error creating cube with images:", error);
        }
    }

    async deleteOne(id: number) {
        const cube = await this.prismaService.cube.findUnique({
            where: {
                id,
                pending: false,
            },
        });
        if (cube === null) {
            throw new NotFoundException("Cube is not found");
        }

        try {
            for (const image of Object.keys(this.sideImageMap)) {
                const imageUrl = cube[this.sideImageMap[image]];

                if (imageUrl) {
                    const fileName = imageUrl.split("/").pop();
                    await this.s3Service.deleteObject(fileName);
                }
            }
        } catch (error) {
            console.error(error);
        }

        await this.prismaService.$transaction(async (prisma) => {
            await prisma.like.deleteMany({
                where: {
                    cubeId: id,
                },
            });

            await prisma.cube.delete({
                where: {
                    id,
                },
            });
        });
    }

    async findOne(id: number): Promise<CubeResponse> {
        const cube = await this.prismaService.cube.findUnique({
            where: {
                id: id,
                pending: false,
            },
        });
        if (cube === null) {
            throw new NotFoundException("Cube is not found");
        }
        return cube;
    }

    async getCubesWithMostLikes(page: number = 1, pageSize: number = 9): Promise<CubeResponse[]> {
        const cubesWithLikes = await this.prismaService.cube.findMany({
            take: pageSize,
            skip: (page - 1) * pageSize,
            orderBy: {
                Like: {
                    _count: "desc",
                },
            },
            where: {
                pending: false,
            },
            include: {
                Like: true,
            },
        });
        return cubesWithLikes;
    }

    async getCubesMostRecentlyPublished(page: number = 1, pageSize: number = 9): Promise<CubeResponse[]> {
        const cubesMostRecentlyPublished = await this.prismaService.cube.findMany({
            take: pageSize,
            skip: (page - 1) * pageSize,
            orderBy: {
                createdAt: "desc",
            },
            where: {
                pending: false,
            },
        });
        return cubesMostRecentlyPublished;
    }

    async getLikedCubes(req: Request): Promise<CubeResponse[]> {
        const payload = req["payload"] as { id: string };
        const cubes = await this.prismaService.like.findMany({
            where: {
                userId: payload.id,
            },
            include: {
                cube: true,
            },
        });
        return cubes.map((cube) => cube.cube);
    }

    async getCubeCount(): Promise<number> {
        const cubeCount = await this.prismaService.cube.count({
            where: {
                pending: false,
            },
        });
        return cubeCount;
    }

    async getCubesByUser(userId: string, page: number = 1, pageSize: number = 9): Promise<CubeResponse[]> {
        const cubes = await this.prismaService.cube.findMany({
            where: {
                ownerId: userId,
                pending: false,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        if (!cubes) {
            throw new NotFoundException();
        }

        return cubes;
    }

    async getUsersCubeCount(userId: string): Promise<number> {
        const count = this.prismaService.cube.count({
            where: {
                ownerId: userId,
                pending: false,
            },
        });

        return count;
    }

    sideImageMap = {
        image1: "side1",
        image2: "side2",
        image3: "side3",
        image4: "side4",
        image5: "side5",
        image6: "side6",
    };
    extensions = ["png, jpg, jpeg"];
}
