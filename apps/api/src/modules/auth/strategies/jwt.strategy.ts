import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(jwtConfig.KEY)
		private jwtConfiguration: ConfigType<typeof jwtConfig>,
		private authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfiguration.secret as string,
			ignoreExpiration: false,
		});
	}

	async validate(payload: AuthJwtPayload) {
		const userId = payload.sub;

		console.log("payload", payload);

		return await this.authService.validateUserByJwt(userId);
	}
}
