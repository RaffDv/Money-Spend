declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BACKEND_URL: string;
			SESSION_SECRET_KEY: string;
			Google_CLIENT_ID: string;
			Google_CLIENT_SECRET: string;
		}
	}
}

export {};
