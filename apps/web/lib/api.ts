import type { z } from "zod";
import { api } from "./constants";
import type { SignUpFormSchema } from "./types";

type signUpFormType = z.infer<typeof SignUpFormSchema>;
export const signUpReq = async (data: signUpFormType) =>
	(await api.post("/auth/register", data)).data;
