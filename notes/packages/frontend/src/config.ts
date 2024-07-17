interface Config {
	apiUrl: string;
	dev: boolean;
}

const devConfig: Config = {
	apiUrl: import.meta.env.VITE_API_URL,
	dev: true,
};

const prodConfig: Config = {
	apiUrl: import.meta.env.VITE_API_URL,
	dev: false,
};

export default function getConfig(): Config {
	if (import.meta.env.PROD) {
		return prodConfig;
	}
	return devConfig;
}
