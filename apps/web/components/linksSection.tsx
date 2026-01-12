"use client";

import { LinkIcon, AlertCircle, CheckCircle2, Banknote } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { Separator } from "./ui/separator";
// @ts-ignore - Hook will be generated
import { useGetBelvoLinks } from "@/lib/gen/hooks/useGetBelvoLinks";
import { ConnectBankButton } from "./connectBankButton";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "./ui/skeleton";

export default function LinksSection() {
	// @ts-ignore
	const { data: links, isLoading } = useGetBelvoLinks();
	const [userId, setUserId] = useState<string>("");
	const [fullname, setFullname] = useState<string>("");

	useEffect(() => {
		const supabase = createClient();
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) {
				setUserId(data.user.id);
				setFullname(data.user.user_metadata.fullname || "Usuário");
			}
		});
	}, []);

	if (isLoading) {
		return (
			<Card className="bg-background/50 backdrop-blur-sm border-muted">
				<CardHeader>
					<Skeleton className="h-8 w-48 mb-2" />
					<Skeleton className="h-4 w-64" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-24 w-full rounded-lg" />
					<Skeleton className="h-24 w-full rounded-lg" />
				</CardContent>
			</Card>
		);
	}

	const hasLinks = links && links.length > 0;

	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1.5">
					<CardTitle>Contas Conectadas</CardTitle>
					<CardDescription>
						Gerencie suas conexões bancárias e integrações.
					</CardDescription>
				</div>
				{hasLinks && userId && (
					<ConnectBankButton userId={userId} fullname={fullname} />
				)}
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent>
				{!hasLinks ? (
					<div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
						<div className="p-4 rounded-full bg-muted/50">
							<LinkIcon className="w-10 h-10 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-medium">Nenhuma conta conectada</h3>
						<p className="text-muted-foreground max-w-sm">
							Conecte suas contas bancárias para ver todas as suas transações em
							um só lugar.
						</p>
						{userId && (
							<div className="mt-4">
								<ConnectBankButton userId={userId} fullname={fullname} />
							</div>
						)}
					</div>
				) : (
					<div className="grid gap-4">
						{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
						{links.map((link: any) => (
							<div
								key={link.id}
								className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
									link.status === "INVALID_CREDENTIALS"
										? "border-red-500/50 bg-red-500/5 dark:bg-red-900/10"
										: "bg-card hover:bg-accent/50"
								}`}
							>
								<div className="flex items-center gap-4">
									<div
										className={`p-2 rounded-full ${
											link.status === "INVALID_CREDENTIALS"
												? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
												: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
										}`}
									>
										<Banknote className="w-5 h-5" />
									</div>
									<div>
										<h4 className="font-medium">
											{link.institution || "Conta Bancária"}
										</h4>
										<p className="text-sm text-muted-foreground">
											Adicionado em{" "}
											{new Date(link.created_at).toLocaleDateString()}
										</p>
										{link.status === "INVALID_CREDENTIALS" && (
											<p className="text-xs text-red-500 mt-1 flex items-center gap-1">
												<AlertCircle size={12} />
												Credenciais inválidas. Reconecte.
											</p>
										)}
									</div>
								</div>

								<div className="flex items-center gap-2">
									{link.status === "ACTIVE" ? (
										<span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20">
											<CheckCircle2 size={14} />
											Ativo
										</span>
									) : (
										<Button
											variant="destructive"
											size="sm"
											onClick={() => {
												// Lógica de reconexão (abrir widget novamente)
												// Pode reutilizar o ConnectBankButton com param de "access_mode=recurrent"
												// ou forçar um novo link.
												console.log("Reconectar", link.id);
											}}
										>
											Reconectar
										</Button>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
