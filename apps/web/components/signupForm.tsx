"use client";
import { signUpReq } from "@/lib/api";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import { AnimatePresence, motion } from "framer-motion";
import SubmitButton from "./submitButton";
import { signIn } from "next-auth/react";

type fields = {
	fullname: string;
	username: string;
	email: string;
	password: string;
};

const SignupForm = () => {
	const mutate = useMutation({
		mutationFn: signUpReq,
		onSuccess: (data, variables) => {
			signIn("credentials", {
				callbackUrl: "/",
				redirect: true,
				email: variables.email,
				password: variables.password,
			});
		},
	});

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
			await mutate.mutateAsync(data);
		}
	};

	return (
		<div className="w-full min-w-96">
			<AnimatePresence>
				{mutate.isError && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="w-full flex justify-center"
					>
						<span className="shadow-lg border border-red-600 rounded text-sm text-red-500 p-2 my-2 bg-red-200 m-4">
							{mutate.error.message}
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

				<SubmitButton isSubmitting={isSubmitting} mutation={mutate}>
					<span>Register</span>
				</SubmitButton>
			</form>
		</div>
	);
};

export default SignupForm;
