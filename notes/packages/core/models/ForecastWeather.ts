import type CommonWeatherStats from './CommonWeatherStats';
export default interface ForecastWeather {
	list: [CommonWeatherStats];
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
