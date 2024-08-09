import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InteractionService {
    constructor(private prismaService: PrismaService) {}

    async toggleLike(req, body: { cubeId: number }): Promise<boolean> {
        const payload = req["payload"] as { id: string };
        const existingLike = await this.prismaService.like.findFirst({
            where: {
                userId: payload.id,
                cubeId: body.cubeId,
            },
        });
        if (existingLike) {
            await this.prismaService.like.deleteMany({
                where: {
                    userId: payload.id,
                    cubeId: body.cubeId,
                },
            });
            return false;
        } else {
            await this.prismaService.like.create({
                data: {
                    userId: payload.id,
                    cubeId: body.cubeId,
                },
            });
            return true;
        }
    }

    async getLikes(body: { cubeId: number }) {
        const likes = await this.prismaService.like.findMany({
            where: {
                cubeId: body.cubeId,
            },
        });
        const likedUsers = likes.map((like) => like.userId);
        return likedUsers;
    }

    async isLiked(req, body: { cubeId: number }): Promise<Boolean> {
        const payload = req["payload"] as { id: string };
        const like = await this.prismaService.like.findFirst({
            where: {
                userId: payload.id,
                cubeId: body.cubeId,
            },
        });

        return like ? true : false;
    }

    async likeCount(body: { cubeId: number }): Promise<number> {
        const count = await this.prismaService.like.count({
            where: {
                cubeId: body.cubeId,
            },
        });

        return count;
    }
}
