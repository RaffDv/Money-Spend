import axios from "axios";

export const BACKEND_URL = process.env.BACKEND_URL;

export const api = axios.create({
	baseURL: 'https://api.bankblend.com.br',
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
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

export const sevenDays = 7 * 24 * 60 * 60 * 1000;
