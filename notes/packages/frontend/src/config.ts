interface Config {
	apiUrl: string;
}

const devConfig: Config = {
	apiUrl: import.meta.env.VITE_API_URL,
};

const prodConfig: Config = {
	apiUrl: import.meta.env.VITE_API_URL,
};

export default function getConfig(): Config {
	console.log(import.meta.env);
	if (import.meta.env.PROD) {
		return prodConfig;
	}
	return devConfig;
}
