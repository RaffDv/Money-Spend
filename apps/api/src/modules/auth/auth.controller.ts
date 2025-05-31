import { Body, Controller, Post } from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post("register")
	register(@Body() body: CreateUserDto) {
		return this.authService.register(body);
	}

	@Post("login")
	login() {}
}
