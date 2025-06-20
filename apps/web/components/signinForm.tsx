"use client";

import { SignInFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { z } from "zod";
import FormField from "./formField";
import SubmitButton from "./submitButton";
import { loginReq } from "@/lib/api";

type fields = {
	email: string;
	password: string;
};
const SignInForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignInFormSchema),
	});

	type signInType = z.infer<typeof SignInFormSchema>;
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: async (data: signInType) => {
			// const backendResult = await loginReq(data);
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				throw new Error(result.error);
			}

			return result;
		},
		onSuccess: async () => {
			// Aguarda a sessão ser atualizada
			await getSession();
			router.push(callbackUrl);
			router.refresh();
		},
	});
	const onSubmit: SubmitHandler<fields> = async (data) => {
		const validatedInputs = SignInFormSchema.safeParse(data);
		if (validatedInputs.success) {
			await mutation.mutateAsync(data);
		}
	};

	return (
		<div className="w-full min-w-96">
			<AnimatePresence>
				{mutation.isError && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className=" w-full flex items-center justify-center "
					>
						<span className="shadow-lg border border-red-600 rounded text-sm text-red-500 p-2 my-2 bg-red-200 m-4">
							{mutation.error.message}
						</span>
					</motion.div>
				)}
			</AnimatePresence>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					register={register}
					type="email"
					name="email"
					error={errors.email}
					placeholder="email@example.com"
				>
					Email
				</FormField>

				<div>
					<FormField
						register={register}
						type="password"
						name="password"
						error={errors.password}
					>
						Password
					</FormField>
					<Link
						href="#"
						className="underline font-bold text-sm  flex w-full justify-end"
					>
						Forgot password
					</Link>
				</div>
				<SubmitButton isSubmitting={isSubmitting} mutation={mutation}>
					<span>Login</span>
				</SubmitButton>
			</form>{" "}
		</div>
	);
};

export default SignInForm;
