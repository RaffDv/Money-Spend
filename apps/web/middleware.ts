// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = {
	"/dashboard": ["user", "admin"],
} as const;

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;

		if (!token) {
			return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
		}
		const requestHeaders = new Headers(req.headers);
		requestHeaders.set("x-auth-token", token.access_token);
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				const { pathname } = req.nextUrl;

				if (
					Object.keys(PROTECTED_ROUTES).some((route) =>
						pathname.startsWith(route),
					)
				) {
					return !!token;
				}

				return true;
			},
		},
	},
);

export const config = {
	matcher: ["/dashboard/:path*"],
};
