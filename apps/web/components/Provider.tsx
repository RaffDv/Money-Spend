"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
	return (
		<div>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</div>
	);
};

export default Provider;
