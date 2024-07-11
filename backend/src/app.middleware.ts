import { Injectable, NestMiddleware, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";
import { jwtConstants } from "./auth/constants/constants";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    async use(request: Request, res: Response, next: NextFunction) {
        try {
            // Apply your AuthGuard logic here
            const token = this.extractTokenFromHeader(request);

            if (!token) {
                throw new UnauthorizedException();
            }
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: jwtConstants.secret,
                });
                request["user"] = payload;
            } catch {
                throw new UnauthorizedException();
            }

            next(request);
        } catch (error) {
            throw new ForbiddenException("Forbidden"); // Or handle the error as per your requirement
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
