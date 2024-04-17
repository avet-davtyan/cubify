import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RewriteApiEndpointMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		// the linked answer replaced "api" but in my case I needed to send "app" requests somewhere else
		req.url = req.url.replace(/^\/app/, '/new-namespace');
		next();
	}
}
