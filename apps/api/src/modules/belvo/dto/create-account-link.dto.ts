import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createAccountLinkDTO {
	@ApiProperty({
		description: "internal user ID",
		example: "6293b998-9b1f-49a2-a1d4-759aeed13f88",
	})
	@IsString()
	userId: string;

	@ApiProperty({
		description: "belvo account link",
		example: "79a239c7-fe1b-4bc7-992b-b9b93a337eac",
	})
	@IsString()
	link: string;
}
