"use client";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import { AnimatePresence, motion } from "framer-motion";
import SubmitButton from "./submitButton";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

type fields = {
	fullname: string;
	username: string;
	email: string;
	password: string;
};

const SignupForm = () => {
	const [formError, setFormError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignUpFormSchema),
	});

	const onSubmit: SubmitHandler<fields> = async (data) => {
		console.log(data);
		const validatedInputs = SignUpFormSchema.safeParse(data);
		if (validatedInputs.success) {
			const { data, error } = await supabase.auth.signUp({
				email: validatedInputs.data.email,
				password: validatedInputs.data.password,
			});
			if (error) {
				setFormError(error.message);
			}
			console.log(data);
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
						className="w-full flex justify-center"
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
					name="fullname"
					type="text"
					error={errors.fullname}
					placeholder="John Doe"
				>
					Full Name
				</FormField>

				<FormField
					register={register}
					name="username"
					type="text"
					error={errors.username}
					placeholder="John7"
				>
					Username
				</FormField>
				<FormField
					error={errors.email}
					register={register}
					type="email"
					name="email"
					placeholder="exemple@exemple.com"
				>
					Email
				</FormField>

				<FormField
					register={register}
					type="password"
					name="password"
					error={errors.password}
				>
					Password
				</FormField>

				<SubmitButton isSubmitting={isSubmitting}>
					<span>Register</span>
				</SubmitButton>
			</form>
		</div>
	);
};

export default SignupForm;
