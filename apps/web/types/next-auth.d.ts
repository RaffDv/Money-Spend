import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		name: string;
		access_token: string;
		refresh_token: string;
		role: string;
	}

	interface Session {
		user: {
			id: string;
			name: string;
			role: string;
		};
		access_token: string;
		refresh_token: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		sub?: string;
		name?: string;
		iat?: number;
		exp?: number;
		access_token: string;
		refresh_token: string;
		accessTokenExpires: number;
		role: string;
	}
}
