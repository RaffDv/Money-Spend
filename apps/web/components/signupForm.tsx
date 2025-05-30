import { signUpReq } from "@/lib/api";
/** TODO: Add react hook form and tanstak query */
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SignUpFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

type fields = {
	name: string;
	email: string;
	password: string;
};

const signupForm = () => {
	const mutate = useMutation({
		mutationFn: signUpReq,
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
		if (validatedInputs.success) await mutate.mutateAsync(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-2">
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" placeholder="John Doe" {...register("name")} />
				</div>
				{errors.name && <p>{errors.name.message}</p>}

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="john@exemple.com"
						{...register("email")}
					/>
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" {...register("password")} />
				</div>
				<Button
					type="submit"
					aria-disabled={mutate.isPending}
					className="w-full mt-2"
				>
					{mutate.isPending ? "Submiting..." : "Submit"}
				</Button>
			</div>
		</form>
	);
};

export default signupForm;
