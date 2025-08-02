import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfilesValues } from "../../lib/types";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard("jwt"), RolesGuard)
	@Roles("ADMIN")
	@Get("/profiles")
	@ApiResponse({
		status: 200,
		description: "Returns all user profiles data",
		type: ProfilesValues,
	})
	@ApiResponse({
		status: 401,
		description: "You are not logged in",
	})
	@ApiResponse({
		status: 403,
		description: "You not have permission to access this resource",
	})
	getAllProfiles() {
		return this.userService.getAll();
	}
}
