import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants/constants';
import { GoogleUser, User } from './types/user.types';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenStrategy {
	private refresh: string;
	private expireTime: string;
	constructor() {
		this.refresh = jwtConstants.refresh;
		this.expireTime = jwtConstants.refreshExpireTime;
	}

	generateRefreshToken(payload: { id: string }): string {
		return jwt.sign(payload, this.refresh, { expiresIn: this.expireTime });
	}

	verify(refreshToken: string): User | GoogleUser {
		try {
			return jwt.verify(refreshToken, this.refresh) as User | GoogleUser;
		} catch {
			throw new UnauthorizedException('unauthorized');
		}
	}
}
