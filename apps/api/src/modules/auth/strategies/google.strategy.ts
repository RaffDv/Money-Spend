import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, type VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import googleOauthConfig from "../config/google-oauth.config";
import { User } from "generated/prisma";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(googleOauthConfig.KEY)
		private readonly oauthConfig: ConfigType<typeof googleOauthConfig>,
		private readonly authService: AuthService,
	) {
		super({
			clientID: oauthConfig.clientID,
			clientSecret: oauthConfig.clientSecret,
			callbackURL: oauthConfig.callbackURL,
			scope: ["email", "profile"],
		});
	}

	async validate(
		access_token: string,
		refresh_token: string,
		profile: any,
		done: VerifyCallback,
	) {
		const user: User = await this.authService.validateGoogleUser({
			email: profile.emails[0].value,
			name: profile.displayName,
			password: "",
		});
		if (!user.id) {
			throw new UnauthorizedException(
				"User cannot create an account or login in app ",
			);
		}
		const tokens = await this.authService.login(user.id, user.name, user.role);

		// Return user data with backend tokens
		done(null, {
			id: user.id,
			role: user.role,
			name: user.name,
			email: profile.emails[0].value,
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
		});
	}
}
