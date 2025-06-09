import { Inject, Injectable } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
	constructor(
		@Inject(refreshConfig.KEY)
		private refreshConfiguration: ConfigType<typeof refreshConfig>,
		private authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
			secretOrKey: refreshConfiguration.secret as string,
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	// append this to request.user
	async validate(req: Request, payload: AuthJwtPayload) {
		const userId = payload.sub;

		const refresh_token = req.body.refresh_token;

		return await this.authService.validateRefreshToken(userId, refresh_token);
	}
}
