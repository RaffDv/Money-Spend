import { signUpReq } from "@/lib/api";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
/** TODO: Add react hook form and tanstak query */
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormField from "./formField";
import { Button } from "./ui/button";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

type fields = {
	name: string;
	email: string;
	password: string;
};

const signupForm = () => {
	const mutate = useMutation({
		mutationFn: signUpReq,
		onSuccess() {
			redirect("/auth/signin");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
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
		<>
			{mutate.error && (
				<span className="shadow-lg border border-red-600 rounded text-sm text-red-500 p-2 my-2 bg-red-200">
					{mutate.error.message}
				</span>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
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

					<Button
						type="submit"
						aria-disabled={mutate.isPending}
						className="w-full mt-2"
					>
						{mutate.isPending ? "Submiting..." : "Submit"}{" "}
					</Button>
				</div>
			</form>
		</>
	);
};

export default signupForm;
