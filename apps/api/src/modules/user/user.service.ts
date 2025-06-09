import { HttpStatus, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "./dto/create-user.dto";
import { hash } from "argon2";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const { password, ...rest } = createUserDto;
		const hashedPassword = await hash(password);
		try {
			const user = await this.prisma.user.create({
				data: {
					password: hashedPassword,
					...rest,
				},
			});

			return {
				user,
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

	async findOne(id: number) {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}
}
