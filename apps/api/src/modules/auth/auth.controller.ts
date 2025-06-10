import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	Response,
	UseGuards,
} from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { GoogleGuard } from "./guards/google-oauth.guard";
import { LocalAuthGuard } from "./guards/local.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// ---------------------------------------------
	// ------------- LOCAL SECTION -----------------
	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("login")
	login(@Request() req) {
		const { id, name } = req.user;
		return this.authService.login(id, name);
	}

	@Public()
	@Post("register")
	async register(@Body() body: CreateUserDto) {
		return await this.authService.register(body);
	}
	// ---------------------------------------------

	// ---------------------------------------------
	// ------------- GOOGLE SECTION ----------------
	@Public()
	@UseGuards(GoogleGuard)
	@Get("google/login")
	googleLogin() {}

	@Public()
	@UseGuards(GoogleGuard)
	@Get("google/callback")
	async googleCallback(@Request() req, @Response() res) {
		const { email, ...rest } = req.user;

		const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

		const redirectUrl = new URL(
			`${frontendUrl}/api/auth/callback/google-custom`,
		);

		redirectUrl.searchParams.append("access_token", rest.access_token);
		redirectUrl.searchParams.append("refresh_token", rest.refresh_token);
		redirectUrl.searchParams.append("user", JSON.stringify(rest));

		res.redirect(redirectUrl.toString());
	}
	// ---------------------------------------------

	// ---------------------------------------------
	// ------------- GITHUB SECTION ----------------

	// ---------------------------------------------

	// ---------------------------------------------
	// ------------- OTHERS SECTION ----------------
	@Public()
	@UseGuards(RefreshGuard)
	@Post("refresh")
	refreshToken(@Request() req) {
		const { id, name } = req.user;

		console.log(req.user);

		return this.authService.refreshToken(id, name);
	}

	@HttpCode(HttpStatus.OK)
	@Post("logout")
	async signout(@Request() req) {
		return await this.authService.signOut(req.user.id);
	}

	// ---------------------------------------------
}
