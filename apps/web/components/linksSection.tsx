import { LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { Separator } from "./ui/separator";

export default function LinksSection() {
	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader>
				<CardTitle>Contas Conectadas</CardTitle>
				<CardDescription>
					Gerencie suas conexões bancárias e integrações.
				</CardDescription>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent>
				<div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
					<div className="p-4 rounded-full bg-muted/50">
						<LinkIcon className="w-10 h-10 text-muted-foreground" />
					</div>
					<h3 className="text-lg font-medium">Nenhuma conta conectada</h3>
					<p className="text-muted-foreground max-w-sm">
						Conecte suas contas bancárias para ver todas as suas transações em
						um só lugar.
					</p>
					<Button className="mt-4">Adicionar Nova Conta</Button>
				</div>
			</CardContent>
		</Card>
	);
}
