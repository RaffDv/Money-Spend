import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { Roles } from "./modules/auth/roles.decorator";
import { RolesGuard } from "./modules/auth/roles.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(AuthGuard("jwt"), RolesGuard)
	@Roles("authenticated")
	@Get("/protected")
	getProtected(@Request() req: any) {
		return req.user;
	}
}
