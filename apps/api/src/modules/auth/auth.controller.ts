import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post("register")
	async register(@Body() body: CreateUserDto) {
		return await this.authService.register(body);
	}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	login(@Request() req) {
		return req.user;
	}
}
