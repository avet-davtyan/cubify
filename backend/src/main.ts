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
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    const options = new DocumentBuilder()
        .setTitle("Your API Title")
        .setDescription("Your API description")
        .setVersion("1.0")
        .addServer("http://localhost:3000/", "Local environment")
        .addTag("Your API Tag")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api-docs", app, document);

    app.use(bodyParser.json());
    await app.listen(3000);
}
bootstrap();
