import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { Separator } from "./ui/separator";

export default function BillingSection() {
	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader>
				<CardTitle>Assinatura & Faturamento</CardTitle>
				<CardDescription>
					Gerencie seu plano e histórico de pagamentos.
				</CardDescription>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent>
				<div className="rounded-lg border p-4 flex justify-between items-center bg-card">
					<div>
						<h3 className="font-medium">Plano Gratuito</h3>
						<p className="text-sm text-muted-foreground">
							Você está usando o plano básico.
						</p>
					</div>
					<Button variant="outline">Fazer Upgrade</Button>
				</div>
			</CardContent>
		</Card>
	);
}
