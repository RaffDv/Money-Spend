declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			JWT_SECRET_KEY: string;
			JWT_EXPIRE: string;
			JWT_REFRESH_SECRET_KEY: string;
			JWT_REFRESH_EXPIRE: string;
		}
	}
}

export {};
