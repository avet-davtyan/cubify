import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    apply(LoggerMiddleware: any) {
        throw new Error("Method not implemented.");
    }
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Request...");
        next();
    }
}
