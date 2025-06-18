import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		fullname: string;
		username: string;
		access_token: string;
		refresh_token: string;
		role: string;
		pictureURL?: string;
	}

	interface Session {
		user: {
			id: string;
			fullname: string;
			username: string;
			role: string;
			pictureURL?: string;
		};
		access_token: string;
		refresh_token: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		sub?: string;
		fullname: string;
		username: string;
		iat?: number;
		exp?: number;
		access_token: string;
		refresh_token: string;
		accessTokenExpires: number;
		role: string;
	}
}
