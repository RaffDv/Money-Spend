"use client";

import { Camera, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema } from "@/lib/types";
import FormField from "./formField";
import { toast } from "sonner";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateProfile } from "@/lib/gen/hooks/useUpdateProfile";
import { createClient } from "@/lib/supabase/client";
import { AxiosError } from "axios";

type ProfileFormValues = {
	fullname: string;
	username: string;
	email: string;
	person_id: string;
};

function ProfileSectionSkeleton() {
	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader>
				<div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
				<div className="h-4 bg-muted rounded w-1/2"></div>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent className="space-y-8">
				{/* Avatar Section Skeleton */}
				<div className="flex flex-col md:flex-row items-center gap-6">
					<div className="relative group w-24 h-24 rounded-full bg-muted flex items-center justify-center"></div>
					<div className="space-y-1 text-center md:text-left">
						<div className="h-5 bg-muted rounded w-32 mb-1"></div>
						<div className="h-4 bg-muted rounded w-48"></div>
						<div className="h-9 w-28 bg-muted rounded mt-2"></div>
					</div>
				</div>

				<Separator />

				{/* Form Fields Skeleton */}
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded w-24 mb-2"></div>
						<div className="h-9 w-full bg-muted rounded"></div>
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded w-24 mb-2"></div>
						<div className="h-9 w-full bg-muted rounded"></div>
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded w-24 mb-2"></div>
						<div className="h-9 w-full bg-muted rounded"></div>
						<div className="h-3 bg-muted rounded w-40 mt-1"></div>
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-muted rounded w-24 mb-2"></div>
						<div className="h-9 w-full bg-muted rounded"></div>
					</div>
				</div>

				<div className="flex justify-end pt-4">
					<div className="h-9 w-36 bg-muted rounded"></div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function ProfileSection({
	user,
	loading,
}: {
	user: SupabaseUser | null;
	loading: boolean;
}) {
	const metadata = user?.user_metadata || {};

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		setFocus,
		trigger,
		formState: { errors, isDirty, isSubmitting },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			fullname: metadata.fullname || metadata.full_name || "",
			username: metadata.username || metadata.name || "",
			email: user?.email || "",
			person_id: metadata.person_id || "",
		},
	});

	const watchedValues = watch();
	const hasEmptyFields =
		!watchedValues.fullname ||
		!watchedValues.username ||
		!watchedValues.person_id;

	useEffect(() => {
		if (user) {
			const defaultValues = {
				fullname:
					user.user_metadata.fullname || user.user_metadata.full_name || "",
				username: user.user_metadata.username || user.user_metadata.name || "",
				email: user.email || "",
				person_id: user.user_metadata.person_id || "",
			};
			reset(defaultValues);

			// Focus and highlight the first empty field
			const validateAndFocus = async () => {
				if (!defaultValues.fullname) {
					setFocus("fullname");
					await trigger("fullname");
				} else if (!defaultValues.username) {
					setFocus("username");
					await trigger("username");
				} else if (!defaultValues.person_id) {
					setFocus("person_id");
					await trigger("person_id");
				}
			};

			validateAndFocus();
		}
	}, [user, reset, setFocus, trigger]);

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
		setValue("person_id", value, { shouldDirty: true });
	};

	const { mutateAsync: updateProfile } = useUpdateProfile();
	const supabase = createClient();

	const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
		try {
			await updateProfile({
				data: {
					fullname: data.fullname,
					username: data.username,
					person_id: data.person_id,
				},
			});

			toast.success("Perfil atualizado com sucesso!");

			// Refresh session to get updated metadata
			const { error } = await supabase.auth.refreshSession();
			if (error) {
				console.error("Error refreshing session:", error);
			}

			// Update form state with new values (clears dirty state)
			reset(data);
		} catch (error) {
			console.error("Failed to update profile:", error);
			if (error instanceof AxiosError && error.response?.status === 409) {
				toast.error("Nome de usuário ou CPF já estão em uso.");
			} else {
				toast.error("Erro ao atualizar perfil. Tente novamente.");
			}
		}
	};

	if (loading) return <ProfileSectionSkeleton />;

	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader>
				<CardTitle>Dados Pessoais</CardTitle>
				<CardDescription>
					Atualize sua foto e informações pessoais aqui.
				</CardDescription>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent>
				<AnimatePresence>
					{hasEmptyFields && (
						<motion.div
							initial={{ opacity: 0, height: 0, marginBottom: 0 }}
							animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
							exit={{ opacity: 0, height: 0, marginBottom: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="overflow-hidden"
						>
							<div className="flex items-center gap-3 p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-md text-yellow-600 dark:text-yellow-400">
								<AlertTriangle size={20} />
								<span className="text-sm font-medium">
									Complete o seu perfil para acessar todos os recursos.
								</span>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="space-y-8">
					{/* Avatar Section */}
					<div className="flex flex-col md:flex-row items-center gap-6">
						<div className="relative group">
							<Avatar className="w-24 h-24 border-2 border-border">
								<AvatarImage
									src={metadata.picture}
									alt={metadata.fullname || "User"}
								/>
								<AvatarFallback className="text-2xl">
									{metadata.fullname?.[0]?.toUpperCase() || "U"}
								</AvatarFallback>
							</Avatar>
							<div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
								<Camera className="text-white" size={24} />
							</div>
						</div>
						<div className="space-y-1 text-center md:text-left">
							<h3 className="font-medium text-lg">Foto de Perfil</h3>
							<p className="text-sm text-muted-foreground">
								JPG, GIF ou PNG. Max 1MB.
							</p>
							<Button variant="outline" size="sm" className="mt-2">
								Alterar foto
							</Button>
						</div>
					</div>

					<Separator />

					{/* Form Fields */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid gap-4 md:grid-cols-2">
							<FormField
								register={register}
								name="fullname"
								type="text"
								error={errors.fullname}
								placeholder="Seu nome"
							>
								Nome Completo
							</FormField>

							<FormField
								register={register}
								name="username"
								type="text"
								error={errors.username}
								placeholder="@username"
							>
								Nome de Usuário
							</FormField>

							<div className="opacity-60 pointer-events-none">
								<FormField
									register={register}
									name="email"
									type="email"
									error={errors.email}
									placeholder="email@exemplo.com"
								>
									Email
								</FormField>
								<p className="text-[0.8rem] text-muted-foreground mt-1">
									O email não pode ser alterado diretamente.
								</p>
							</div>

							<FormField
								register={register}
								name="person_id"
								type="text"
								error={errors.person_id}
								placeholder="000.000.000-00"
								registerOptions={{
									onChange: handlePersonIdChange,
								}}
							>
								CPF/CNPJ
							</FormField>
						</div>

						<div className="flex justify-end pt-4">
							<Button type="submit" disabled={!isDirty || isSubmitting}>
								{isSubmitting ? "Salvando..." : "Salvar Alterações"}
							</Button>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	);
}
