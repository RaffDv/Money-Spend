import type { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
function getSupabaseClient(): SupabaseClient {
	// Executando no Navegador?
	if (typeof window !== "undefined") {
		// Importa dinamicamente e retorna o cliente do navegador.
		const { createClient } = require("./supabase/client");
		return createClient();
	}
	// Executando no Servidor.
	else {
		// Importa dinamicamente e retorna o cliente do servidor.
		const { createClient } = require("./supabase/server");
		return createClient();
	}
}

api.interceptors.request.use(
	async (config) => {
		try {
			const supabase = getSupabaseClient();
			const { data } = await supabase.auth.getSession();

			if (data.session?.access_token) {
				config.headers.Authorization = `Bearer ${data.session.access_token}`;
			}
		} catch (error) {
			console.error("Erro ao obter sessão do Supabase no interceptor:", error);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default api;
