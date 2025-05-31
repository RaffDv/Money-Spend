import { HttpStatus, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "./dto/create-user.dto";
import { hash } from "argon2";
// biome-ignore lint/style/useImportType: <explanation>
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { password, ...rest } = createUserDto;
		const hashedPassword = await hash(password);
		try {
			await this.prisma.user.create({
				data: {
					password: hashedPassword,
					...rest,
				},
			});

			return {
				statusCode: HttpStatus.CREATED,
			};
		} catch (error) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				errorName: error.name,
				errorMsg: error.message,
			};
		}
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
}
