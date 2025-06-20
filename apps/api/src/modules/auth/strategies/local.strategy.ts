import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: "email",
		});
	}

	// The return object of the ‘validate’ function will be added to the request object. (request.user)
	async validate(email: string, password: string) {
		if (password === "")
			throw new UnauthorizedException("Please provide your password");
		return await this.authService.validateUser(email, password);
	}
}
