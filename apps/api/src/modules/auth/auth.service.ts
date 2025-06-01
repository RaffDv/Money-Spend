import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { verify } from "argon2";

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async register(createUserDto: CreateUserDto) {
		const user = await this.userService.findByEmail(createUserDto.email);

		if (user) throw new ConflictException("User already exists!");

		return await this.userService.create(createUserDto);
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);

		if (!user) throw new UnauthorizedException("Credentials are incorrect");

		const isPasswordMatched = await verify(user.password, password);

		if (!isPasswordMatched)
			throw new UnauthorizedException("Credentials are incorrect");

		return { id: user.id, name: user.name };
	}
}
