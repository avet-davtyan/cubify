import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard'; // Import your AuthGuard

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private authGuard: AuthGuard) {}

	async use(req: Request, res: Response, next: NextFunction) {
		try {
			// Apply your AuthGuard logic here
			await this.authGuard.canActivateRequest(req);
			next();
		} catch (error) {
			throw new ForbiddenException('Forbidden'); // Or handle the error as per your requirement
		}
	}
}
