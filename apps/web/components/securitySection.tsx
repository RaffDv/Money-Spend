import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function SecuritySection() {
	return (
		<Card className="bg-background/50 backdrop-blur-sm border-muted">
			<CardHeader>
				<CardTitle>Segurança</CardTitle>
				<CardDescription>
					Configurações de senha e autenticação.
				</CardDescription>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="current-password">Senha Atual</Label>
					<Input id="current-password" type="password" />
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="new-password">Nova Senha</Label>
						<Input id="new-password" type="password" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
						<Input id="confirm-password" type="password" />
					</div>
				</div>
				<div className="flex justify-end pt-4">
					<Button>Atualizar Senha</Button>
				</div>
			</CardContent>
		</Card>
	);
}
