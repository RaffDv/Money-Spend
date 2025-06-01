"use server";
import { TextEncoder } from "node:util";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { sevenDays } from "./constants";
import { redirect } from "next/navigation";

export type Session = {
	user: {
		id: string;
		name: string;
	};
	// access_token: string;
	// refresh_token: string;
};
const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET_KEY);
export async function createSession(payload: Session) {
	const cookieStorage = await cookies();
	const expireAt = new Date(Date.now() + sevenDays);

	const session = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secretKey);

	cookieStorage.set("session", session, {
		secure: true,
		httpOnly: true,
		sameSite: "lax",
		expires: expireAt,
		path: "/",
	});
}
export async function getSession() {
	const cookieStorage = await cookies();
	const cookie = cookieStorage.get("session")?.value;
	if (!cookie) return null;

	try {
		const { payload } = await jwtVerify(cookie, secretKey, {
			algorithms: ["HS256"],
		});

		return payload as Session;
	} catch (err) {
		console.error("Failed to verify the session ", err);
		redirect("/auth/login");
	}
}
