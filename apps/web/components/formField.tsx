// formField.tsx - Versão com Framer Motion
import type { PropsWithChildren } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
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
	<motion.div
		layout="size"
		className="flex flex-col space-y-1"
		transition={{
			layout: { duration: 0.3, ease: "easeInOut" },
		}}
	>
		<div className="flex flex-col space-y-0.5">
			<Label htmlFor={name} className="w-full">
				{children}
			</Label>
			<motion.div>
				<Input
					type={type}
					placeholder={placeholder}
					{...register(name, { valueAsNumber })}
					className={`transition-all duration-200 w-full ${
						error
							? "border-red-500 focus:ring-red-500 focus:border-red-500"
							: "focus:ring-0"
					}`}
				/>
			</motion.div>
		</div>

		<AnimatePresence mode="wait">
			{error && (
				<motion.div
					initial={{
						opacity: 0,
						height: 0,
						y: -5,
						scale: 0.95,
					}}
					animate={{
						opacity: 1,
						height: "auto",
						y: 0,
						scale: 1,
						transition: {
							height: { duration: 0.3, ease: "easeOut" },
							opacity: { duration: 0.2, delay: 0.1 },
							y: { duration: 0.3, ease: "easeOut" },
							scale: { duration: 0.2, delay: 0.15 },
						},
					}}
					exit={{
						opacity: 0,
						height: 0,
						y: -3,
						scale: 0.95,
						transition: {
							opacity: { duration: 0.15 },
							height: { duration: 0.25, delay: 0.1, ease: "easeIn" },
							y: { duration: 0.25, delay: 0.1, ease: "easeIn" },
							scale: { duration: 0.15 },
						},
					}}
					className="overflow-hidden"
					style={{ width: "100%" }}
				>
					<motion.div
						className="pt-1"
						initial={{ x: -10 }}
						animate={{ x: 0 }}
						transition={{ duration: 0.2, delay: 0.2 }}
					>
						<motion.span
							className="text-sm text-red-500 flex items-center gap-1 "
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.2, delay: 0.25 }}
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<motion.svg
								className="w-4 h-4 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								initial={{ rotate: -90, scale: 0 }}
								animate={{ rotate: 0, scale: 1 }}
								transition={{
									duration: 0.25,
									delay: 0.2,
									type: "spring",
									stiffness: 300,
								}}
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</motion.svg>
							{error.message}
						</motion.span>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	</motion.div>
);

export default FormField;
