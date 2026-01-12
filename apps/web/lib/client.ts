import { createClient } from "@/lib/supabase/client";

export type RequestConfig<TData = unknown> = {
	baseURL?: string;
	url?: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	params?: object;
	data?: TData | FormData;
	responseType?:
		| "arrayBuffer"
		| "blob"
		| "document"
		| "json"
		| "text"
		| "stream";
	signal?: AbortSignal;
	headers?: HeadersInit;
};

export type ResponseConfig<TData = unknown> = {
	data: TData;
	status: number;
	statusText: string;
};

export const httpClient = async <TData, TError = unknown, TVariables = unknown>(
	config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const token = session?.access_token;

	const headers = new Headers(config.headers);

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	if (
		!headers.has("Content-Type") &&
		config.data &&
		!(config.data instanceof FormData)
	) {
		headers.set("Content-Type", "application/json");
	}

	const baseUrl = config.baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
	const url = config.url?.startsWith("/") ? config.url : `/${config.url}`;

	const response = await fetch(`${baseUrl}${url}`, {
		method: config.method.toUpperCase(),
		body:
			config.data instanceof FormData
				? config.data
				: JSON.stringify(config.data),
		signal: config.signal,
		headers: headers,
	});
	const data = await response.json();

	if (!response.ok) {
		return Promise.reject(data as TError);
	}
	return {
		data,
		status: response.status,
		statusText: response.statusText,
	};
};

export default httpClient;
