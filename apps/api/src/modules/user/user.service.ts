import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async findOne(id: string) {
		return await this.prisma.profiles.findUnique({
			where: {
				user_id: id,
			},
		});
	}
	async getAll() {
		return await this.prisma.profiles.findMany();
	}
}
