declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_API_URL: string;
			NEXT_PUBLIC_WEB_URL: string;
			NEXT_PUBLIC_SUPABASE_AUTH_PUB_KEY: string;
			NEXT_PUBLIC_SUPABASE_AUTH_PRIVATE_KEY: string;
			NEXT_PUBLIC_SUPABASE_PROJECT_URL: string;
			NEXT_PUBLIC_SUPABASE_GOOGLE_CALLBACK: string;
			Google_CLIENT_ID: string;
			Google_CLIENT_SECRET: string;
		}
	}
}

export {};
