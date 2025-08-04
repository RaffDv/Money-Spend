import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserService } from "./user.service";
import { ProfileDto } from "./dto/profile.dto";

@ApiBearerAuth()
@ApiTags("users")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard("jwt"), RolesGuard)
	@Roles("ADMIN")
	@Get("/profiles")
	@ApiOperation({ summary: "Fecth a list of profiles" })
	@ApiResponse({
		status: 200,
		description: "Returns all user profiles data",
		type: ProfileDto,
		isArray: true,
	})
	@ApiResponse({
		status: 401,
		description: "You are not logged in",
	})
	@ApiResponse({
		status: 403,
		description: "You not have permission to access this resource",
	})
	@ApiOperation({
		operationId: "getAllProfiles",
	})
	getAllProfiles() {
		return this.userService.getAll();
	}
}
