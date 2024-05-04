import handler from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import currentWeather, {
	popularWeatherStats,
} from '../../core/models/currentWeather';

export const main = handler(async (event) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { lat, lon } = JSON.parse(event.body || '{}');

	if (lat == null) {
		lat = '-38.15';
	}
	if (lon == null) {
		lon = '144.34';
	}

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.WEATHER_API_SECRET_KEY}`,
	);

	const body = (await response.json()) as currentWeather;
	const temps = body.main as popularWeatherStats;

	return JSON.stringify(temps);
});
