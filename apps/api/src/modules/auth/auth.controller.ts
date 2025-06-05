import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { RefreshGuard } from "./guards/refresh.guard";

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
		const { id, name } = req.user;
		return this.authService.login(id, name);
	}

	@UseGuards(JwtAuthGuard)
	@Get("protected")
	getAnything(@Request() req) {
		return `Protected Route !! You can access this, your ID is ${req.user.id}`;
	}

	@UseGuards(RefreshGuard)
	@Post("refresh")
	refreshToken(@Request() req) {
		const { id, name } = req.user;

		console.log(req.user);

		return this.authService.refreshToken(id, name);
	}
}
