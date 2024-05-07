import handler from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import type currentWeather from '../../core/models/currentWeather';
import type { PopularWeatherStats } from '../../core/models/currentWeather';

export const main = handler(async (event) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const { lat, lon } = JSON.parse(event.queryStringParameters?.lat || '{}');

	console.log(JSON.stringify(event.queryStringParameters));

	let lat = event.queryStringParameters?.lat;
	let lon = event.queryStringParameters?.lon;

	if (lat == null) {
		lat = '-38.15';
	}
	if (lon == null) {
		lon = '144.34';
	}

	console.log(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
	);

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
	);

	const body = (await response.json()) as currentWeather;
	const temps = body.main as PopularWeatherStats;

	return JSON.stringify(temps);
});
