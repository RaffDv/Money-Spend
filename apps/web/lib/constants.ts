import axios from "axios";
export const BACKEND_URL = process.env.BACKEND_URL;

export const api = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
