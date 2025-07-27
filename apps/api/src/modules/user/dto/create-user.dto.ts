import { IsEmail, IsOptional, IsString } from "class-validator";
export class CreateUserDto {
	@IsString()
	fullname: string;

	@IsString()
	username: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	pictureURL: string;

	@IsString()
	password: string;
}
