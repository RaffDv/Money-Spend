"use client";

import { useState, useEffect } from "react";
import { User, Link as LinkIcon, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import ProfileSection from "@/components/profileSection";
import LinksSection from "@/components/linksSection";
import SecuritySection from "@/components/securitySection";
import BillingSection from "@/components/billingSection";

type Section = "profile" | "links" | "security" | "billing";

export default function AccountPage() {
	const [activeSection, setActiveSection] = useState<Section>("profile");
	const [user, setUser] = useState<SupabaseUser | null>(null);
	const [loading, setLoading] = useState(true);

	const supabase = createClient();

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		};
		getUser();
	}, [supabase]);

	const navItems = [
		{ id: "profile", label: "Dados Pessoais", icon: User },
		{ id: "links", label: "Contas Conectadas", icon: LinkIcon },
		{ id: "security", label: "Segurança", icon: Shield },
		{ id: "billing", label: "Assinatura", icon: CreditCard },
	] as const;

	return (
		<div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] gap-6 p-6">
			{/* Sidebar */}
			<aside className="w-full md:w-64 flex-shrink-0">
				<Card className="h-full bg-background/50 backdrop-blur-sm border-muted">
					<CardContent className="p-4 py-6 flex flex-col gap-2">
						<div className="mb-4 px-2">
							<h2 className="text-xl font-bold tracking-tight">Minha Conta</h2>
							<p className="text-sm text-muted-foreground">
								Gerencie suas informações
							</p>
						</div>
						<nav className="flex flex-col gap-1">
							{navItems.map((item) => (
								<Button
									key={item.id}
									variant={activeSection === item.id ? "secondary" : "ghost"}
									className={cn(
										"justify-start gap-2 h-10 w-full",
										activeSection === item.id && "bg-secondary font-medium",
									)}
									onClick={() => setActiveSection(item.id)}
								>
									<item.icon size={18} />
									{item.label}
								</Button>
							))}
						</nav>
					</CardContent>
				</Card>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-auto">
				<div className="max-w-4xl mx-auto space-y-6">
					{activeSection === "profile" && (
						<ProfileSection user={user} loading={loading} />
					)}
					{activeSection === "links" && <LinksSection />}
					{activeSection === "security" && <SecuritySection />}
					{activeSection === "billing" && <BillingSection />}
				</div>
			</main>
		</div>
	);
}
