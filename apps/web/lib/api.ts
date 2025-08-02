import type { CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
