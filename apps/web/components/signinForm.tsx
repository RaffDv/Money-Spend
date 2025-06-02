"use client";
import { loginReq } from "@/lib/api";
import { createSession } from "@/lib/session";
import { SignInFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import SubmitButton from "./submitButton";

type fields = {
	email: string;
	password: string;
};
const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignInFormSchema),
	});

	const router = useRouter();
	const mutation = useMutation({
		mutationFn: loginReq,
		onSuccess: async (data: { id: string; name: string }) => {
			await createSession({
				user: data,
			});
			router.push("/dashboard");
		},
	});
	const onSubmit: SubmitHandler<fields> = async (data) => {
		console.log(data);
		const validatedInputs = SignInFormSchema.safeParse(data);
		if (validatedInputs.success) {
			await mutation.mutateAsync(data);
		}
	};

	return (
		<>
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
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-80 h-fit p-3"
			>
				<div className="flex flex-col gap-2">
					<FormField
						register={register}
						type="email"
						name="email"
						error={errors.email}
						placeholder="email@example.com"
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
		</>
	);
};

export default SignInForm;
