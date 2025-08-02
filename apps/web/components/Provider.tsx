"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { Toaster } from "./ui/sonner";
import { client } from "@/lib/client/client.gen";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 60000 },
	},
});

client.setConfig({
	baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/",
});
const Provider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<Toaster />
		</>
	);
};

export default Provider;
