import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GenerateTokensDTO {
	@ApiProperty({
		description: "The ID of the user for whom the widget token is generated.",
		example: "user-123",
	})
	@IsString()
	userId: string;

	@ApiProperty({
		description:
			"The real username fullname to generate tokens to access the belvo widget",
		example: "Jonh Doe",
	})
	@IsString()
	fullname: string;
}
