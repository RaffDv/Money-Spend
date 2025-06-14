import {
	ConflictException,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash, verify } from "argon2";
import type { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";
import { AuthJwtPayload } from "./types/auth-jwtPayload";
import refreshConfig from "./config/refresh.config";
import { ConfigType } from "@nestjs/config";
import { Role, User } from "generated/prisma";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		@Inject(refreshConfig.KEY)
		private refreshConfiguration: ConfigType<typeof refreshConfig>,
	) {}

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

		return { id: user.id, name: user.name, role: user.role };
	}

	async login(userId: number, name: string, role: Role) {
		const { access_token, refresh_token } = await this.generateTokens(userId);
		const hasedRT = await hash(refresh_token);

		await this.userService.updateHRT(userId, hasedRT);
		return {
			id: userId,
			role,
			name,
			access_token,
			refresh_token,
		};
	}

	async generateTokens(userId: number) {
		const payload: AuthJwtPayload = {
			sub: userId,
		};

		const [access_token, refresh_token] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, this.refreshConfiguration),
		]);

		return {
			access_token,
			refresh_token,
		};
	}

	async validateUserByJwt(userId: number) {
		const user = await this.userService.findOne(userId);

		if (!user) throw new UnauthorizedException("User not found.");

		const currentUser = {
			id: user.id,
			role: user.role,
		};

		return currentUser;
	}

	// FIX: necessary update to rewoke tokens
	async validateRefreshToken(userId: number, refresh_token: string) {
		const user = await this.userService.findOne(userId);

		if (!user) throw new UnauthorizedException("User not found.");
		const RTMatched = await verify(
			user?.hashedRefreshToken as string,
			refresh_token,
		);

		if (!RTMatched)
			throw new UnauthorizedException("Refresh Token is invalid.");

		const currentUser = {
			id: user.id,
			name: user.name,
		};

		return currentUser;
	}

	// FIX: necessary update to rewoke tokens
	async refreshToken(userId: number, name: string) {
		const { access_token, refresh_token } = await this.generateTokens(userId);

		const hasedRT = await hash(refresh_token);
		await this.userService.updateHRT(userId, hasedRT);

		return {
			id: userId,
			name,
			access_token,
			refresh_token,
		};
	}

	async validateGoogleUser(googleUser: CreateUserDto): Promise<User> {
		const user = await this.userService.findByEmail(googleUser.email);

		if (user) return user;

		const response = await this.userService.create(googleUser);

		const newUser = { ...response.user };
		return {
			id: newUser.id as number,
			publicId: newUser.publicId as string,
			email: newUser.email as string,
			hashedRefreshToken: newUser.hashedRefreshToken as string,
			password: newUser.password as string,
			name: newUser.name as string,
			role: newUser.role as Role,
		};
	}

	async signOut(userId: number) {
		console.log("signout invalidate tokens");

		return await this.userService.updateHRT(userId, null);
	}
}
