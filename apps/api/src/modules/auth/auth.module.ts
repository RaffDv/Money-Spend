import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import googleOauthConfig from "./config/google-oauth.config";
import jwtConfig from "./config/jwt.config";
import refreshConfig from "./config/refresh.config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { RefreshStrategy } from "./strategies/refresh.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Module({
	imports: [
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
		ConfigModule.forFeature(refreshConfig),
		ConfigModule.forFeature(googleOauthConfig),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
		RefreshStrategy,
		GoogleStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [AuthService],
})
export class AuthModule {}
