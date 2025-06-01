"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import { SignInFormSchema } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { loginReq } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { createSession } from "@/lib/session";

type fields = {
	email: string;
	password: string;
};
const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
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
			{mutation.isError && (
				<span className="shadow-lg border border-red-600 rounded text-sm text-red-500 p-2 my-2 bg-red-200">
					{mutation.error.message}
				</span>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<Button
					type="submit"
					aria-disabled={mutation.isPending}
					className="w-full my-2"
				>
					{mutation.isPending ? "Submiting..." : "Sign In"}{" "}
				</Button>
			</form>
		</>
	);
};

export default SignInForm;
