import { Controller, Get, Patch, Body, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBody,
} from "@nestjs/swagger";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UserService } from "./user.service";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

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

	@UseGuards(AuthGuard("jwt"))
	@Patch("/profile")
	@ApiOperation({ summary: "Update user profile" })
	@ApiResponse({
		status: 200,
		description: "Profile updated successfully",
		type: ProfileDto,
	})
	@ApiResponse({
		status: 400,
		description: "Bad Request",
	})
	@ApiResponse({
		status: 409,
		description: "Username or CPF already taken",
	})
	@ApiBody({ type: UpdateProfileDto })
	@ApiOperation({
		operationId: "updateProfile",
	})
	updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
		// Assuming the JWT strategy attaches the user object (with 'sub' or 'id') to req.user
		const userId = req.user.sub || req.user.id;
		return this.userService.updateProfile(userId, updateProfileDto);
	}
}
