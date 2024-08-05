import type CommonWeatherStats from './CommonWeatherStats';

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

export default CurrentWeather;
