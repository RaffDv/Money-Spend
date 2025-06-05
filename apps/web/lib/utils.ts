import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { JWT } from "next-auth/jwt";
import { twMerge } from "tailwind-merge";
import { refreshReq } from "./api";
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function refreshAccessToken(token: JWT) {
	try {
		const response = await refreshReq(token.refresh_token);

		const payload = JSON.parse(
			atob(response.data.access_token.split(".")[1] as string),
		);
		const expiration = dayjs.unix(payload.exp);
		if (response.status !== 201) {
			throw new Error("|cannot refresh tokens| ", response.data);
		}
		return {
			...token,
			access_token: response.data.access_token,
			refresh_token: response.data.refresh_token ?? token.refresh_token,
			accessTokenExpires: expiration.valueOf(),
		};
	} catch (error) {
		console.log("Erro ao renovar token:", error);
		return {
			...token,
		};
	}
}

export function getTokenExpiration(token: string): number {
	try {
		const payload = JSON.parse(atob(token.split(".")[1] as string));

		const expiration = dayjs.unix(payload.exp);

		return expiration.valueOf();
	} catch (error) {
		console.warn("Erro ao decodificar token:", error);
		// Fallback: 1 minuto a partir de agora
		return dayjs().add(1, "minute").valueOf();
	}
}

export function isTokenExpired(tokenExpiration: number): boolean {
	const expTime = dayjs(tokenExpiration).subtract(5, "m");
	console.log(
		"Expiration Time - 5 minutes",
		dayjs(expTime).format("DD/MM/YYYY HH:mm:ss"),
	);

	return dayjs().isAfter(expTime);
}
