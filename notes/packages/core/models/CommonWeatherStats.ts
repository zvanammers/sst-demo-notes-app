import type PopularWeather from './PopularWeather';
import type WeatherIcon from './WeatherIcon';

export default interface CommonWeatherStats {
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
	main: PopularWeather;
	weather: [WeatherIcon];
}
