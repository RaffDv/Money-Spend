import { ApiProperty } from "@nestjs/swagger";

export class ProfilesValues {
	@ApiProperty({
		description: "O ID único do usuário (UUID)",
		example: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
	})
	user_id: string;

	@ApiProperty({
		description: "O nome completo do usuário",
		example: "Carlos Santana",
	})
	fullname: string;

	@ApiProperty({
		description: "O nome de usuário único (para login)",
		example: "carlossantana",
	})
	username: string;

	@ApiProperty({
		description: "A função (role) do usuário no sistema",
		// Para tipos union (enum), você pode especificar as opções
		enum: ["ADMIN", "MODERATOR", "USER"],
		example: "USER",
	})
	role: "ADMIN" | "MODERATOR" | "USER";

	@ApiProperty({
		description: "A URL para a foto de perfil do usuário",
		// Importante para propriedades que podem ser nulas
		nullable: true,
		example: "https://minha-cdn.com/fotos/carlossantana.jpg",
	})
	picture: string | null;
}
