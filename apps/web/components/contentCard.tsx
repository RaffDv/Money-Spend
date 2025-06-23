import React, { ReactElement } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
// Os sub-componentes continuam iguais, servindo como "marcadores"
const Title = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const Description = ({ children }: { children: React.ReactNode }) => (
	<>{children}</>
);
const Content = ({ children }: { children: React.ReactNode }) => (
	<>{children}</>
);

// --- COMPONENTE PRINCIPAL ATUALIZADO ---
type ContentCardProps = {
	children: React.ReactNode;
	className?: string;
};

export function ContentCard({ children, className }: ContentCardProps) {
	let title: ReactElement | null = null;
	let description: ReactElement | null = null;
	let content: ReactElement | null = null;

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement<{ children: React.ReactElement }>(child)) {
			return;
		}

		// Agora, o acesso a 'child.props.children' é 100% seguro e tipado!
		// Não precisamos mais de nenhum "as" (type assertion).
		if (child.type === Title) {
			title = child.props.children;
		} else if (child.type === Description) {
			description = child.props.children;
		} else if (child.type === Content) {
			content = child.props.children;
		}
	});

	return (
		<Card
			className={`min-w-full min-h-full flex flex-col hover:border-primary transition-colors duration-300 bg-background/20 backdrop-blur-md cursor-default ${className}`}
		>
			<CardHeader className="flex flex-col items-center justify-center text-center">
				{title && <CardTitle>{title}</CardTitle>}
				{description && (
					<CardDescription className="text-primary-foreground text-xl font-semibold mt-4">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="flex-grow">{content}</CardContent>
		</Card>
	);
}

ContentCard.Title = Title;
ContentCard.Description = Description;
ContentCard.Content = Content;
export default ContentCard;
