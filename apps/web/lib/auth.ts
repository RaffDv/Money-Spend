import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginReq } from "./api";
import {
	getTokenExpiration,
	isTokenExpired,
	refreshAccessToken,
} from "./utils";
import { api } from "./constants";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 2 * 60 * 60, //2 hrs
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
		{
			id: "Google-custom",
			name: "Google",
			type: "oauth",
			authorization: {
				url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/Google/login`,
				params: {
					scope: "email profile",
					response_type: "code",
				},
			},
			clientId: process.env.Google_CLIENT_ID,
			clientSecret: process.env.Google_CLIENT_SECRET,
			profile(profile, tokens) {
				return {
					id: profile.id as string,
					name: profile.name as string,
					email: profile.email as string,
					access_token: tokens.access_token as string,
					refresh_token: tokens.refresh_token as string,
					image: null,
				};
			},
		},
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
					role: token.role,
				},
			};
		},
		jwt: async ({ token, user }) => {
			if (user) {
				console.log(user);

				return {
					...token,
					id: user.id,
					access_token: user.access_token,
					refresh_token: user.refresh_token,
					accessTokenExpires: getTokenExpiration(user.access_token),
					role: user.role,
				};
			}

			if (isTokenExpired(token.accessTokenExpires)) {
				// FIX: Multiple requests to api
				return await refreshAccessToken(token);
			}

			return token;
		},

		async signIn({ user, account, profile }) {
			// para validações ( opcional )
			if (account?.provider === "Google-custom") {
				return true;
			}
			return true;
		},
	},
};
