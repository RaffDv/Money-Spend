import type { z } from "zod";
import { api } from "./constants";
import type { SignInFormSchema, SignUpFormSchema } from "./types";

type signUpFormType = z.infer<typeof SignUpFormSchema>;
export const signUpReq = async (data: signUpFormType) =>
	(await api.post("/auth/register", data)).data;

type loginType = z.infer<typeof SignInFormSchema>;
export const loginReq = async (data: loginType) =>
	(await api.post("/auth/login", data)).data;
