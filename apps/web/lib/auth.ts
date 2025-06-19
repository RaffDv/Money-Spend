import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginReq } from "./api";
import {
	getTokenExpiration,
	isTokenExpired,
	refreshAccessToken,
} from "./utils";
import { cookies } from "next/headers";

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
				const response = await loginReq({
					email: credentials?.email as string,
					password: credentials?.password as string,
				});

				const setCookieHeader = response.headers["set-cookie"];

				const tokens: Record<string, string> = {};

				if (setCookieHeader) {
					// biome-ignore lint/complexity/noForEach: <explanation>
					setCookieHeader.forEach((cookie: string) => {
						const [cookieData] = cookie.split(";");

						if (!cookieData) return null;
						const [name, value] = cookieData.split("=");

						// Assumindo que seus tokens têm nomes específicos
						if (
							name?.includes("access_token") ||
							name?.includes("refresh_token")
						) {
							if (!value) return null;
							tokens[name.trim()] = value.trim();
						}
					});
				}
				const cookiesStorage = await cookies();

				Object.entries(tokens).map(([name, value]) => {
					cookiesStorage.set(name, value, {
						httpOnly: true,
						secure: true,
						path: "/",
						domain: process.env.HOST,
					});
				});
				if (response.data?.error) throw new Error("auth.ts | error on request");
				return await {
					...response.data,
				};
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
					fullname: profile.name as string,
					username: profile.username as string,
					role: profile.role as string,
					access_token: tokens.access_token as string,
					refresh_token: tokens.refresh_token as string,
					pictureURL: profile.pictureURL,
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
					id: token.id as string,
					role: token.role,
					fullname: token.fullname,
					username: token.username,
				},
			};
		},
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					id: user.id,
					access_token: user.access_token,
					refresh_token: user.refresh_token,
					accessTokenExpires: getTokenExpiration(user.access_token),
					role: user.role,
					username: user.username,
					fullname: user.fullname,
					picture: user.pictureURL,
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
