// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
	const cookieStorage = await cookies();
	cookieStorage.set("access_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		expires: new Date(0), // Data no passado para remover
	});

	cookieStorage.set("refresh_token", "", {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
		expires: new Date(0),
	});
	return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
}
