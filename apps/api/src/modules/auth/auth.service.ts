import { ConflictException, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async register(createUserDto: CreateUserDto) {
		const user = await this.userService.findByEmail(createUserDto.email);

		if (user) throw new ConflictException("User already exists!");

		return await this.userService.create(createUserDto);
	}
}
