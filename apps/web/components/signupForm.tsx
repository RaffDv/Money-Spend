"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { SignUpFormSchema } from "@/lib/types";
import FormField from "./formField";
import SubmitButton from "./submitButton";
import { useRouter } from "next/navigation";

type fields = {
	fullname: string;
	username: string;
	email: string;
	password: string;
};

const SignupForm = () => {
	const router = useRouter();
	const supabase = createClient();
	const [formError, setFormError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignUpFormSchema),
	});

	const onSubmit: SubmitHandler<fields> = async (data) => {
		const validatedInputs = SignUpFormSchema.safeParse(data);
		if (validatedInputs.success) {
			const { data, error } = await supabase.auth.signUp({
				email: validatedInputs.data.email,
				password: validatedInputs.data.password,
				options: {
					data: {
						fullname: validatedInputs.data.fullname,
						username: validatedInputs.data.username,
						email: validatedInputs.data.email,
					},
				},
			});
			if (error) {
				setFormError(error.message);
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
