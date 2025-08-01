"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<Toaster />
		</>
	);
};

export default Provider;
