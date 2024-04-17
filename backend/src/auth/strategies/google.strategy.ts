import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { GoogleUser, User } from '../types/user.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: process.env.clientID,
			clientSecret: process.env.clientSecret,
			callbackURL: process.env.callbackURL,
			scope: ['email', 'profile'],
		});
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	): Promise<any> {
		const { name, emails, photos } = profile;
		const user: GoogleUser = {
			id: profile.id,
			googleId: profile.id,
			fullName: profile.displayName,
			email: emails[0].value,
			avatar: photos[0].value,
		};

		done(null, user);
	}
}
