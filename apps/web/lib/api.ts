import type { z } from "zod";
import { api } from "./constants";
import type { SignInFormSchema, SignUpFormSchema } from "./types";
import axios from "axios";

type signUpFormType = z.infer<typeof SignUpFormSchema>;
export const signUpReq = async (data: signUpFormType) =>
	(await api.post("/auth/register", data)).data;

type loginType = z.infer<typeof SignInFormSchema>;
export const loginReq = async (data: loginType) => {
	const resp = await api.post("/auth/login", data);

	return resp;
};

export const refreshReq = async (refresh_token: string) => {
	const r = await axios.post(
		`${process.env.BACKEND_URL}/auth/refresh`,
		{},
		{
			headers: {
				Cookie: `refresh_token=${refresh_token};`,
			},
		},
	);

	return r;
};

export const logoutReq = async () => {
	const r = await api.post("/auth/logout");

	return r;
};
