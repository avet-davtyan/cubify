import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({
        allowedHeaders: "*",
        origin: "*",
        credentials: true,
    });
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use(bodyParser.json());
    await app.listen(3000);
}
bootstrap();
