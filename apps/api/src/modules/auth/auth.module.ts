import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [PassportModule, ConfigModule],
	providers: [JwtStrategy],
	exports: [PassportModule],
})
export class AuthModule {}
