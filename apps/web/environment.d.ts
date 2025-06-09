declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BACKEND_URL: string;
			SESSION_SECRET_KEY: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}

export {};
