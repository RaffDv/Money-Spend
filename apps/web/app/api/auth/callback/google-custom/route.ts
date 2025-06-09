import { type NextRequest, NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);

	const access_token = searchParams.get("access_token");
	const refresh_token = searchParams.get("refresh_token");
	const userString = searchParams.get("user");

	if (!access_token || !refresh_token || !userString) {
		console.log("Missing required parameters for Google OAuth callback");
		return NextResponse.redirect(new URL("/auth/login?error=MissingParams", request.url));
	}

	try {
		const user = JSON.parse(userString);

		// Create NextAuth JWT token with backend tokens
		const token = await encode({
			token: {
				sub: user.id.toString(),
				name: user.name,
				email: user.email,
				access_token,
				refresh_token,
				userId: user.id,
				accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour
			},
			secret: process.env.NEXTAUTH_SECRET!,
		});

		// Set NextAuth session cookie
		const response = NextResponse.redirect(new URL("/dashboard", request.url));
		
		response.cookies.set(
			process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
			token,
			{
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 30 * 24 * 60 * 60, // 30 days
				path: "/",
			}
		);

		return response;
	} catch (error) {
		console.error("Error processing Google callback:", error);
		return NextResponse.redirect(
			new URL("/auth/login?error=ProcessingFailed", request.url),
		);
	}
}
