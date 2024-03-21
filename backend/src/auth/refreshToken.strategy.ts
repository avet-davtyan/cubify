import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants/constants';
import { User } from './types/user.types';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenStrategy {
	private refresh: string;
	private expireTime: string;
	constructor() {
		this.refresh = jwtConstants.refresh;
		this.expireTime = jwtConstants.refreshExpireTime;
	}

	generateRefreshToken(user: User): string {
		return jwt.sign(user, this.refresh, { expiresIn: this.expireTime });
	}

	verify(refreshToken: string): User {
		try {
			return jwt.verify(refreshToken, this.refresh) as User;
		} catch {
			throw new UnauthorizedException('unauthorized');
		}
	}
}
