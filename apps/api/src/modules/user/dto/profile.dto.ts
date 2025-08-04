import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum profileRoles {
	ADMIN,
	MODERATOR,
	USER,
}
export class ProfileDto {
	@ApiProperty({
		description: "user UUID",
		example: "96ba8790-8acb-48e5-869d-750b41ff81f3",
		readOnly: true,
	})
	user_id: string;

	@ApiProperty({
		description: "user fullname",
		example: "John Doe",
	})
	fullname: string;

	@ApiProperty({
		description: "user username",
		example: "john007",
	})
	username: string;

	@ApiProperty({
		description: "user role in app to grant or deny access to resources",
		example: "USER",
		enum: profileRoles,
	})
	role: profileRoles;

	@ApiPropertyOptional({
		description: "user profile image url",
		example:
			"https://lh3.googleusercontent.com/a/google_picture_internal_id | null",
	})
	picture: string | null;
	@ApiProperty({
		description: "user email in app to login",
		example: "john.doe@gmail.com",
	})
	email: string;

	@ApiProperty({
		description: "user create accont date",
		example: "2025-08-01 22:00:00.239695+00",
	})
	created_at: string;
}
