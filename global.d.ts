declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT: string;
			DB_HOST: string;
			MONGODB_URI: string;
		}
	}
}

export {};
