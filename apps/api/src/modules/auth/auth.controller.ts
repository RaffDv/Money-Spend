import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	Response,
	UseGuards,
} from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { GoogleGuard } from "./guards/google-oauth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post("register")
	async register(@Body() body: CreateUserDto) {
		return await this.authService.register(body);
	}

	// logins area
	// local login
	@UseGuards(LocalAuthGuard)
	@Post("login")
	login(@Request() req) {
		const { id, name } = req.user;
		return this.authService.login(id, name);
	}

	//google login
	@UseGuards(GoogleGuard)
	@Get("google/login") // get http://localhost:4000/auth/google/login return me to choose google account page
	googleLogin() {}

	// TODO: GITHUB LOGIN
	//

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

	// callback area
	@UseGuards(GoogleGuard)
	@Get("google/callback")
	async googleCallback(@Request() req, @Response() res) {
		const user = req.user;

		// Redirect back to NextJS with the tokens
		const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
		const redirectUrl = new URL(`${frontendUrl}/api/auth/callback/google-custom`);

		// Add the tokens and user data as query params
		redirectUrl.searchParams.append("access_token", user.access_token);
		redirectUrl.searchParams.append("refresh_token", user.refresh_token);
		redirectUrl.searchParams.append("user", JSON.stringify(user));

		res.redirect(redirectUrl.toString());
	}
}
