import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InteractionService {
	constructor(private prismaService: PrismaService) {}
	async like(req, body: { cubeId: number }) {
		const payload = req['payload'] as { id: string };
		const existingLike = await this.prismaService.like.findFirst({
			where: {
				userId: payload.id,
				cubeId: body.cubeId,
			},
		});
		if (existingLike) {
			throw new HttpException('Like already exists', HttpStatus.CONFLICT);
		}
		await this.prismaService.like.create({
			data: {
				userId: payload.id,
				cubeId: body.cubeId,
			},
		});
	}

	async removeLike(req, body: { cubeId: number }) {
		const payload = req['payload'] as { id: string };
		const existingLike = await this.prismaService.like.findFirst({
			where: {
				userId: payload.id,
				cubeId: body.cubeId,
			},
		});
		if (existingLike === null) {
			throw new HttpException('Like does not exist', HttpStatus.CONFLICT);
		}
		await this.prismaService.like.deleteMany({
			where: {
				userId: payload.id,
				cubeId: body.cubeId,
			},
		});
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
		const payload = req['payload'] as { id: string };
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
