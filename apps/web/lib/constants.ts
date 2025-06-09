import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const BACKEND_URL = process.env.BACKEND_URL;

export const api = axios.create({
	baseURL: BACKEND_URL || "http://localhost:4000",
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
	(config) => {
		// No servidor, pegar do header da requisição
		if (typeof window === "undefined") {
			// Server-side
			const { headers } = require("next/headers");
			const headersList = headers();
			const authToken = headersList.get("x-auth-token");

			if (authToken) {
				config.headers.Authorization = `Bearer ${authToken}`;
			}
			console.log(config.headers);
		}

		return config;
	},
	(error) => Promise.reject(error),
);
export const sevenDays = 7 * 24 * 60 * 60 * 1000;
