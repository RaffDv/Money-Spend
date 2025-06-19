import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	Res,
	Response,
	UseGuards,
} from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { GoogleGuard } from "./guards/google-oauth.guard";
import { LocalAuthGuard } from "./guards/local.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { Public } from "./decorators/public.decorator";
import { Roles } from "./decorators/roles.decorator";
import { Response as ResExpress } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {}

	// ---------------------------------------------
	// ------------- LOCAL SECTION -----------------
	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Request() req, @Res({ passthrough: true }) res: ResExpress) {
		const { id, fullname, username, role } = req.user;
		const user = await this.authService.login(id, fullname, username, role);

		res.cookie("refresh_token", user.refresh_token, {
			domain: this.configService.get<string>("APP_URL"),
			httpOnly: true,
			secure: true,
		});

		res.cookie("access_token", user.access_token, {
			domain: this.configService.get<string>("APP_URL"),
			httpOnly: true,
			secure: true,
		});

		return { ...user };
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
	async googleCallback(@Request() req, @Res() res:ResExpress) {
		const { email, ...rest } = req.user;
		console.log(rest);

		const frontendUrl = process.env.FRONTEND_URL

		const redirectUrl = new URL(
			`${frontendUrl}/api/auth/callback/google-custom`,
		);

		redirectUrl.searchParams.append("access_token", rest.access_token);
		redirectUrl.searchParams.append("refresh_token", rest.refresh_token);
		redirectUrl.searchParams.append("user", JSON.stringify(rest));

		res.cookie("refresh_token", rest.refresh_token, {
			domain: this.configService.get<string>("APP_URL"),
			httpOnly: true,
			secure: true,
		});

		res.cookie("access_token", rest.access_token, {
			domain: this.configService.get<string>("APP_URL"),
			httpOnly: true,
			secure: true,
		});
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
		const { id, fullname, username } = req.user;

		console.log(req.user);

		return this.authService.refreshToken(id, fullname, username);
	}

	@HttpCode(HttpStatus.OK)
	@Post("logout")
	async signout(@Request() req) {
		return await this.authService.signOut(req.user.id);
	}

	@Roles("ADMIN", "USER")
	@Get("protected")
	protected(@Request() req) {
		return {
			message: `Protected route, admin only, if you access this you can see you public id ${req.user.id}`,
		};
	}
	// ---------------------------------------------
}
