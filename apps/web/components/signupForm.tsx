"use client";
import { signUpReq } from "@/lib/api";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SubmitButton from "./submitButton";

type fields = {
	name: string;
	email: string;
	password: string;
};

const SignupForm = () => {
	const router = useRouter();
	const mutate = useMutation({
		mutationFn: signUpReq,
		onSuccess() {
			router.push("/auth/login");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignUpFormSchema),
		mode: "onBlur", // Valida quando sai do campo
	});

	const onSubmit: SubmitHandler<fields> = async (data) => {
		console.log(data);
		const validatedInputs = SignUpFormSchema.safeParse(data);
		if (validatedInputs.success) {
			await mutate.mutateAsync(data);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			{/* Mensagem de erro global com animação */}
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
					name="name"
					type="text"
					error={errors.name}
					placeholder="John Doe"
				>
					Name
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
