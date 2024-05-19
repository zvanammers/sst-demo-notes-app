import handler from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import type currentWeather from '../../../core/models/currentWeather';
import type { PopularWeatherStats } from '@models/currentWeather';
import type ZipInfo from '@models/zipInfo';
import type CityInfo from '@models/cityInfo';

function isValidNumber(str: string) {
	// Attempt to parse the string as a floating-point number
	const num = Number.parseFloat(str);

	// Check if the entire string is a valid number and there are no trailing characters
	return !Number.isNaN(num) && str.trim() === num.toString();
}

export const main = handler(async (event) => {
	console.log(JSON.stringify(event.queryStringParameters));

	if (!event.queryStringParameters) {
		return '';
	}

	let lat: string;
	let lon: string;

	if (
		isValidNumber(event.queryStringParameters?.lat ?? '') ||
		isValidNumber(event.queryStringParameters?.lat ?? '')
	) {
		lat = Number.parseFloat(event.queryStringParameters?.lat ?? '').toString();
		lon = Number.parseFloat(event.queryStringParameters?.lon ?? '').toString();

		return fetchTemp(lat, lon);
	}

	const postcode = event.queryStringParameters.postcode ?? '';

	if (postcode) {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/zip?zip=${postcode},AU&appid=${Config.WEATHER_API_SECRET_KEY}`,
			);
			const data = (await response.json()) as ZipInfo;
			lat = data.lat.toString();
			lon = data.lon.toString();
		} catch (error) {
			throw new Error('Failed to retrieve geo co-ordinates for postcode');
		}

		return fetchTemp(lat, lon);
	}

	const city = event.queryStringParameters.city ?? '';

	if (city) {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${city},AU&limit=1&appid=${Config.WEATHER_API_SECRET_KEY}`,
			);
			const data = (await response.json()) as CityInfo[];
			console.log(data);
			const cityInfo = data[0];
			lat = cityInfo.lat.toString();
			lon = cityInfo.lon.toString();
		} catch (error) {
			throw new Error('Failed to retrieve geo co-ordinates for city');
		}

		return fetchTemp(lat, lon);
	}

	return '';
});

const fetchTemp = async (lat: string, lon: string) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
		);

		const body = (await response.json()) as currentWeather;
		// const temps = body.main as PopularWeatherStats;

		return JSON.stringify(body);
	} catch (error) {
		throw new Error('Could not fetch weather data');
	}
};
