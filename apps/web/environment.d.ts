declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BACKEND_URL: string;
			SESSION_SECRET_KEY: string;
		}
	}
}

export {};
