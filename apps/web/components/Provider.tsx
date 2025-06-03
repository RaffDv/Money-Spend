"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</SessionProvider>
		</>
	);
};

export default Provider;
