import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService, UserService],
})
export class AuthModule {}
