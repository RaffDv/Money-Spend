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
	const response = await fetch(`${config.baseURL}${config.url}`, {
		method: config.method.toUpperCase(),
		body: JSON.stringify(config.data),
		signal: config.signal,
		headers: config.headers,
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
