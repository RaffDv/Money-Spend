"use client";

import { SignInFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import SubmitButton from "./submitButton";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type fields = {
	email: string;
	password: string;
};
const SignInForm = () => {
	const [formError, setFormError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignInFormSchema),
	});

	const router = useRouter();
	const onSubmit: SubmitHandler<fields> = async (data) => {
		const validatedInputs = SignInFormSchema.safeParse(data);
		if (validatedInputs.success) {
			const { error } = await supabase.auth.signInWithPassword({
				email: validatedInputs.data.email,
				password: validatedInputs.data.password,
			});
			if (error) {
				setFormError(error.message);
				return;
			}
			router.push("/");
		}
	};

	return (
		<div className="w-full min-w-96">
			<AnimatePresence>
				{formError && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className=" w-full flex items-center justify-center "
					>
						<span className="shadow-lg border border-red-600 rounded text-sm text-red-500 p-2 my-2 bg-red-200 m-4">
							{formError}
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
				<SubmitButton isSubmitting={isSubmitting}>
					<span>Login</span>
				</SubmitButton>
			</form>{" "}
		</div>
	);
};

export default SignInForm;
