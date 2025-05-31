import type { PropsWithChildren } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export type FormFieldProps = {
	type: string;
	placeholder?: string;
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	register: UseFormRegister<any>;
	error: FieldError | undefined;
	valueAsNumber?: boolean;
};
const FormField: React.FC<FormFieldProps & PropsWithChildren> = ({
	type,
	placeholder,
	name,
	register,
	error,
	valueAsNumber,
	children,
}) => (
	<>
		<div className="flex flex-col">
			<Label htmlFor={name}>{children}</Label>
			<Input
				type={type}
				placeholder={placeholder}
				{...register(name, { valueAsNumber })}
			/>
		</div>
		{error && (
			<span className="text-sm text-red-500 p-1 animate-in transition-all">
				{error.message}
			</span>
		)}
	</>
);
export default FormField;
