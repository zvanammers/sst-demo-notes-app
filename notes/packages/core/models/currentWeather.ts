interface PopularWeatherStats {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level: number;
	grnd_level: number;
}

interface WeatherIconStats {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface CommonWeatherStats {
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	rain: {
		'1h': number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	main: PopularWeatherStats;
	weather: [WeatherIconStats];
}

interface CurrentWeather extends CommonWeatherStats {
	coord: {
		lon: number;
		lat: number;
	};
	base: string;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
}

interface ForecastWeather {
	stats: [CommonWeatherStats];
	city: {
		coord: {
			lon: number;
			lat: number;
		};
		id: number;
		name: string;
		country: string;
		timezone: string;
		sunrise: number;
		sunset: number;
	};
}

export type {
	PopularWeatherStats,
	WeatherIconStats,
	CommonWeatherStats,
	ForecastWeather,
};
export default CurrentWeather;
