import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateProfileDto {
	@ApiProperty({
		description: "The full name of the user",
		example: "John Doe",
		required: false,
	})
	@IsString()
	@IsOptional()
	@MinLength(2)
	fullname?: string;

	@ApiProperty({
		description: "The unique username of the user",
		example: "johndoe123",
		required: false,
	})
	@IsString()
	@IsOptional()
	@MinLength(2)
	username?: string;

	@ApiProperty({
		description: "The CPF or CNPJ of the user",
		example: "000.000.000-00",
		required: false,
	})
	@IsString()
	@IsOptional()
	person_id?: string;
}
