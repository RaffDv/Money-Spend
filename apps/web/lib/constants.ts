import axios from "axios";
export const BACKEND_URL = process.env.BACKEND_URL;

export const api = axios.create({
	baseURL: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});
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
