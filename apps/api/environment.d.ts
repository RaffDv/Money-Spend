declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			API_URL: string;
			API_HOSTNAME: string;
			CLIENT_URL: string;

			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			SUPABASE_AUTH_PUB_KEY: string;
			SUPABASE_AUTH_PRIVATE_KEY: string;
			SUPABASE_AUTH_PROJECT_URL: string;
			SUPABASE_JWT_SECRET: string;

			BELVO_SECRET_ID: string;
			BELVO_SECRET_PASSWORD: string;
		}
	}
}

export {};
