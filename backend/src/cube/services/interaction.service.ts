import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/auth/types/user.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InteractionService {
	constructor(private prismaService: PrismaService) {}
	async like(req, body: { cubeId: number }) {
		const user = req.user as User;
		const existingLike = await this.prismaService.like.findFirst({
			where: {
				userId: user.id,
				cubeId: body.cubeId,
			},
		});
		if (existingLike) {
			throw new HttpException('Like already exists', HttpStatus.CONFLICT);
		}
		const newLike = await this.prismaService.like.create({
			data: {
				userId: user.id,
				cubeId: body.cubeId,
			},
		});
	}

	async removeLike(req, body: { cubeId: number }) {
		const user = req.user as User;
		const existingLike = await this.prismaService.like.findFirst({
			where: {
				userId: user.id,
				cubeId: body.cubeId,
			},
		});
		if (existingLike === null) {
			throw new HttpException('Like does not exist', HttpStatus.CONFLICT);
		}
		await this.prismaService.like.deleteMany({
			where: {
				userId: user.id,
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
		const user = req.user as User;
		const like = await this.prismaService.like.findFirst({
			where: {
				userId: user.id,
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
