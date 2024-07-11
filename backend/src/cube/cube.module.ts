import { Module } from "@nestjs/common";
import { CubeController } from "./cube.controller";
import { CubeService } from "./cube.service";
import { InteractionService } from "./services/interaction.service";

@Module({
    controllers: [CubeController],
    providers: [CubeService, InteractionService],
})
export class CubeModule {}
