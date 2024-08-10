import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CubeModule } from "./cube/cube.module";
import { join } from "path";
import { AuthMiddleware } from "./app.middleware";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserModule } from "./user/user.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { RewriteApiEndpointMiddleware } from "./auth/middlewares/redirect.middleware";
import { ConfigModule } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailModule } from "./mail/mail.module";
import cubeImageDir from "cube_image_config";

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        CubeModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", cubeImageDir),
            serveRoot: `/${cubeImageDir}`,
        }),
        UserModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [UserService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RewriteApiEndpointMiddleware) // Apply your custom middleware
            .forRoutes("/");
    }
}
