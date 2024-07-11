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
    Delete,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { join } from "path";
import { Request } from "express";
import { CreateCubeBodyDto, CreateCubeFilesDto } from "./dtos/CreateCube.dto";
import { CubeService } from "./cube.service";
import { CreateCubeGuard } from "./guards/createCube.guard";
import { AuthGuardJWT } from "src/auth/guards/auth.guard";
import { InteractionService } from "./services/interaction.service";
import { CubeResponse } from "./types/cube.types";
import { ValidateCubeParamPipe } from "./pipes/validate-cube-param/validate-cube-param.pipe";

@Controller("cube")
export class CubeController {
    constructor(
        private cubeService: CubeService,
        private interactionService: InteractionService
    ) {}

    @UseGuards(AuthGuardJWT)
    @Post("create_cube")
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: "image1", maxCount: 1 },
            { name: "image2", maxCount: 1 },
            { name: "image3", maxCount: 1 },
            { name: "image4", maxCount: 1 },
            { name: "image5", maxCount: 1 },
            { name: "image6", maxCount: 1 },
        ])
    )
    async uploadFile(
        @UploadedFiles() createCubeFilesDto: CreateCubeFilesDto,
        @Body() createCubeBodyDto: CreateCubeBodyDto,
        @Req() requset: Request
    ): Promise<CubeResponse> {
        return await this.cubeService.createCube(createCubeFilesDto, createCubeBodyDto, requset);
    }

    @UseGuards(AuthGuardJWT)
    @Delete("/specific/:id")
    async deleteOne(@Param("id", ValidateCubeParamPipe) id: number) {
        await this.cubeService.deleteOne(id);
    }

    @Get("/specific/:id")
    async findOne(@Param("id", ValidateCubeParamPipe) id: number): Promise<CubeResponse> {
        return await this.cubeService.findOne(id);
    }

    @UseGuards(AuthGuardJWT)
    @Post("like")
    async like(@Req() req, @Body() body: { cubeId: number }) {
        return await this.interactionService.like(req, body);
    }

    @UseGuards(AuthGuardJWT)
    @Post("removeLike")
    async removeLike(@Req() req, @Body() body: { cubeId: number }) {
        return await this.interactionService.removeLike(req, body);
    }

    @UseGuards(AuthGuardJWT)
    @Get("likedCubes")
    async getLikedCubes(@Req() req): Promise<CubeResponse[]> {
        return await this.cubeService.getLikedCubes(req);
    }

    @Post("getLikes")
    async getLikes(@Body() body: { cubeId: number }) {
        return await this.interactionService.getLikes(body);
    }

    @UseGuards(AuthGuardJWT)
    @Post("isLiked")
    async isLiked(@Req() req, @Body() body: { cubeId: number }): Promise<Boolean> {
        return await this.interactionService.isLiked(req, body);
    }

    @Post("likeCount")
    async likeCount(@Body() body: { cubeId: number }): Promise<number> {
        return await this.interactionService.likeCount(body);
    }

    @Get("most-liked")
    async getCubesWithMostLikes(
        @Query("page") page: number,
        @Query("pageSize") pageSize: number
    ): Promise<CubeResponse[]> {
        page = Math.floor(page) || 1;
        pageSize = Math.floor(pageSize) || 2;

        return this.cubeService.getCubesWithMostLikes(page, pageSize);
    }

    @Get("latest")
    async getCubesMostRecentlyPublished(
        @Query("page") page: number,
        @Query("pageSize") pageSize: number
    ): Promise<CubeResponse[]> {
        page = Math.floor(page) || 1;
        pageSize = Math.floor(pageSize) || 9;

        return this.cubeService.getCubesMostRecentlyPublished(page, pageSize);
    }

    @Get("user/:userId")
    async getCubesByUser(
        @Query("page") page: number,
        @Query("pageSize") pageSize: number,
        @Param("userId") userId: string
    ) {
        page = Math.floor(page) || 1;
        pageSize = Math.floor(pageSize) || 9;

        return this.cubeService.getCubesByUser(userId, page, pageSize);
    }

    @Get("count")
    async getCubeCount() {
        return this.cubeService.getCubeCount();
    }

    @Get("count/:userId")
    async getUsersCubeCount(@Param() params: { userId: string }) {
        return this.cubeService.getUsersCubeCount(params.userId);
    }
}
