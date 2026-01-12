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
	person_id: string;
};

const SignupForm = () => {
	const router = useRouter();
	const supabase = createClient();
	const [formError, setFormError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<fields>({
		resolver: zodResolver(SignUpFormSchema),
	});

	const handlePersonIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, "");
		if (value.length > 14) value = value.slice(0, 14);

		if (value.length <= 11) {
			value = value
				.replace(/(\d{3})(\d)/, "$1.$2")
				.replace(/(\d{3})(\d)/, "$1.$2")
				.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		} else {
			value = value
				.replace(/^(\d{2})(\d)/, "$1.$2")
				.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
				.replace(/\.(\d{3})(\d)/, ".$1/$2")
				.replace(/(\d{4})(\d)/, "$1-$2");
		}
		setValue("person_id", value);
	};

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
						person_id: validatedInputs.data.person_id,
					},
				},
			});
			if (error) {
				setFormError(error.message);
				console.log(error);
				console.log(data);

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
					register={register}
					name="person_id"
					type="text"
					error={errors.person_id}
					placeholder="123.456.789-00"
					registerOptions={{
						onChange: handlePersonIdChange,
					}}
				>
					CPF/CNPJ
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
