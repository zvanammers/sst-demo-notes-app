import type PopularWeather from '../models/PopularWeather';

export function convertFahrenheit(fah: number) {
	return (fah - 32) / 1.8;
}

export function convertCelcius(cel: number) {
	return (cel * 9) / 5 + 32;
}

export function convertPopularWeatherStatsToCelcius(
	stats?: PopularWeather,
): PopularWeather | undefined {
	if (!stats) {
		return undefined;
	}
	return {
		feels_like: convertFahrenheit(stats.feels_like),
		temp: convertFahrenheit(stats.temp),
		temp_max: convertFahrenheit(stats.temp_max),
		temp_min: convertFahrenheit(stats.temp_min),
		pressure: stats.pressure,
		humidity: stats.humidity,
		sea_level: stats.sea_level,
		grnd_level: stats.grnd_level,
	} as PopularWeather;
}
