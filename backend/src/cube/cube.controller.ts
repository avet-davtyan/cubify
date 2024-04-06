import {
	Controller,
	Post,
	Body,
	UseInterceptors,
	UploadedFiles,
	Get,
	UseGuards,
	Req,
	Param,
	Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { join } from 'path';
import { Request } from 'express';
import { CreateCubeBodyDto, CreateCubeFilesDto } from './dtos/CreateCube.dto';
import { CubeService } from './cube.service';
import { CreateCubeGuard } from './guards/createCube.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Cube } from './types/cube.types';
import { InteractionService } from './services/interaction.service';

@Controller('cube')
export class CubeController {
	constructor(
		private cubeService: CubeService,
		private interactionService: InteractionService,
	) {}

	@UseGuards(AuthGuard)
	@Post('create_cube')
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'image1', maxCount: 1 },
			{ name: 'image2', maxCount: 1 },
			{ name: 'image3', maxCount: 1 },
			{ name: 'image4', maxCount: 1 },
			{ name: 'image5', maxCount: 1 },
			{ name: 'image6', maxCount: 1 },
		]),
	)
	async uploadFile(
		@UploadedFiles() createCubeFilesDto: CreateCubeFilesDto,
		@Body() createCubeBodyDto: CreateCubeBodyDto,
		@Req() requset: Request,
	): Promise<Cube> {
		return await this.cubeService.createCube(createCubeFilesDto, createCubeBodyDto, requset);
	}

	@Get('specific/:id')
	async findOne(@Param() params: { id: string }): Promise<Cube> {
		return await this.cubeService.findOne(+params.id);
	}

	@Get()
	async fincMany(@Query() queries: { show: string }): Promise<Cube[]> {
		return await this.cubeService.findMany(queries);
	}

	@UseGuards(AuthGuard)
	@Post('like')
	async like(@Req() req, @Body() body: { cubeId: number }) {
		return this.interactionService.like(req, body);
	}

	@UseGuards(AuthGuard)
	@Post('removeLike')
	async removeLike(@Req() req, @Body() body: { cubeId: number }) {
		return this.interactionService.removeLike(req, body);
	}

	@Post('getLikes')
	async getLikes(@Body() body: { cubeId: number }) {
		return await this.interactionService.getLikes(body);
	}

	@UseGuards(AuthGuard)
	@Post('isLiked')
	async isLiked(@Req() req, @Body() body: { cubeId: number }): Promise<Boolean> {
		return await this.interactionService.isLiked(req, body);
	}

	@Post('likeCount')
	async likeCount(@Body() body: { cubeId: number }): Promise<number> {
		return await this.interactionService.likeCount(body);
	}

	@Get('most-liked')
	async getCubesWithMostLikes(@Query('page') page: number, @Query('pageSize') pageSize: number) {
		page = Math.floor(page) || 1;
		pageSize = Math.floor(pageSize) || 2;

		return this.cubeService.getCubesWithMostLikes(page, pageSize);
	}

	@Get('count')
	async getCubeCount() {
		return this.cubeService.getCubeCount();
	}
}
