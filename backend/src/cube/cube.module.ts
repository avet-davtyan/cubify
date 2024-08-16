import { Module } from "@nestjs/common";
import { CubeController } from "./cube.controller";
import { CubeService } from "./cube.service";
import { InteractionService } from "./services/interaction.service";
import { S3Service } from "./services/s3.service";

@Module({
    controllers: [CubeController],
    providers: [CubeService, InteractionService, S3Service],
})
export class CubeModule {}
