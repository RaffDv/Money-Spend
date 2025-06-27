import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const inter = Inter({
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "BankBlend",
	description: "Controle Financeiro Inteligente",
};

export const dynamic = "force-dynamic";
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${inter.className} antialiased dark `}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
