import type { z } from "zod";
import { api } from "./constants";
import type { SignInFormSchema, SignUpFormSchema } from "./types";
import axios from "axios";

type signUpFormType = z.infer<typeof SignUpFormSchema>;
export const signUpReq = async (data: signUpFormType) =>
	(await api.post("/auth/register", data)).data;

type loginType = z.infer<typeof SignInFormSchema>;
export const loginReq = async (data: loginType) =>
	(await api.post("/auth/login", data)).data;

export const refreshReq = async (refresh_token: string) => {
	const r = await axios.post("http://localhost:4000/auth/refresh", {
		refresh_token,
	});

	return r;
};
