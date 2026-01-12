import {
	Injectable,
	ConflictException,
	InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
	private supabaseAdmin: SupabaseClient;

	constructor(
		private prisma: PrismaService,
		private configService: ConfigService,
	) {
		this.supabaseAdmin = createClient(
			this.configService.get<string>("SUPABASE_AUTH_PROJECT_URL") || "",
			this.configService.get<string>("SUPABASE_AUTH_PRIVATE_KEY") || "",
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false,
				},
			},
		);
	}

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

	async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
		const { username, person_id, fullname } = updateProfileDto;

		// 1. Check for uniqueness conflicts if username or person_id are being updated
		if (username) {
			const existingUser = await this.prisma.profiles.findFirst({
				where: {
					username,
					user_id: { not: userId }, // Exclude current user
				},
			});
			if (existingUser) {
				throw new ConflictException("Username already taken");
			}
		}

		if (person_id) {
			const existingPerson = await this.prisma.profiles.findFirst({
				where: {
					person_id,
					user_id: { not: userId },
				},
			});
			if (existingPerson) {
				throw new ConflictException("CPF/CNPJ already registered");
			}
		}

		try {
			// 2. Update Prisma (Database)
			const updatedProfile = await this.prisma.profiles.update({
				where: { user_id: userId },
				data: {
					...(fullname && { fullname }),
					...(username && { username }),
					...(person_id && { person_id }),
				},
			});

			// 3. Update Supabase Auth Metadata
			const { error } = await this.supabaseAdmin.auth.admin.updateUserById(
				userId,
				{
					user_metadata: {
						fullname: updatedProfile.fullname,
						username: updatedProfile.username,
						person_id: updatedProfile.person_id,
					},
				},
			);

			if (error) {
				console.error("Failed to sync Supabase metadata:", error);
				// We might want to throw or just log.
				// For data integrity, throwing is safer, but the DB is already updated.
				// Let's log it for now as the user can retry or the token refresh might get the DB data if configured.
				// Ideally, we might want a transaction but Supabase Auth is external.
			}

			return updatedProfile;
		} catch (error) {
			if (error instanceof ConflictException) throw error;
			console.error("Error updating profile:", error);
			throw new InternalServerErrorException("Failed to update profile");
		}
	}
}
