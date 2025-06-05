import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const BACKEND_URL = process.env.BACKEND_URL;

export const api = axios.create({
	baseURL: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor de resposta para tratar erros
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.data?.message) {
			const customError = new Error(error.response.data.message);
			customError.name = "BackendError";
			return Promise.reject(customError);
		}
		return Promise.reject(error);
	},
);

api.interceptors.request.use(
	async (config) => {
		try {
			const session = await getServerSession(authOptions);

			if (session?.access_token) {
				config.headers.Authorization = `Bearer ${session.access_token}`;
			}
			console.log(config.url);
		} catch (error) {
			console.error(error);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
export const sevenDays = 7 * 24 * 60 * 60 * 1000;
