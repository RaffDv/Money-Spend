import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginReq } from "./api";
import dayjs from "dayjs";
import {
	getTokenExpiration,
	isTokenExpired,
	refreshAccessToken,
} from "./utils";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const result = await loginReq({
					email: credentials?.email as string,
					password: credentials?.password as string,
				});
				if (!result) throw new Error("auth.ts | error on request");
				return result;
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				access_token: token.access_token,
				refresh_token: token.refresh_token,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					userId: user.id,
					access_token: user.access_token,
					refresh_token: user.refresh_token,
					accessTokenExpires: getTokenExpiration(user.access_token),
				};
			}
			console.log(
				dayjs(token.accessTokenExpires).format("DD/MM/YYYY HH:mm:ss"),
			);

			if (isTokenExpired(token.accessTokenExpires)) {
				console.log("refresh_token");

				return await refreshAccessToken(token);
			}
			console.log("----------------------------------");

			console.log("valid");
			console.log("----------------------------------");

			return token;
		},
	},
};
