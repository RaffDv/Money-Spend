import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import refreshConfig from "./config/refresh.config";
import { RefreshStrategy } from "./strategies/refresh.strategy";

@Module({
	imports: [
		JwtModule.registerAsync(jwtConfig.asProvider()),
		ConfigModule.forFeature(jwtConfig),
		ConfigModule.forFeature(refreshConfig),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
		RefreshStrategy,
	],
	exports: [AuthService],
})
export class AuthModule {}
