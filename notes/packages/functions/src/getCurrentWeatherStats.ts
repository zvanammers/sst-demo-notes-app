import handler, { type ReturnWithStatus } from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import type currentWeather from '../../core/models/currentWeather';
import type ZipInfo from '@models/zipInfo';
import type CityInfo from '@models/cityInfo';

interface LatLon {
	lat: string;
	lon: string;
}

function isValidNumber(str: string) {
	// Attempt to parse the string as a floating-point number
	const num = Number.parseFloat(str);

	// Check if the entire string is a valid number and there are no trailing characters
	return !Number.isNaN(num) && str.trim() === num.toString();
}

const fetchTemp = async (latLon: LatLon) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
		);

		const body = (await response.json()) as currentWeather;
		return {
			statusCode: 200,
			body: JSON.stringify(body),
		} as ReturnWithStatus;
	} catch (error) {
		throw new Error('Could not fetch weather data');
	}
};

const getLatLonFromPostCode = async (postCode: string): Promise<LatLon> => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/geo/1.0/zip?zip=${postCode},AU&appid=${Config.WEATHER_API_SECRET_KEY}`,
		);
		const data = (await response.json()) as ZipInfo;
		const lat = data.lat.toString();
		const lon = data.lon.toString();
		return { lat, lon } as LatLon;
	} catch (error) {
		throw new Error('Failed to retrieve geo co-ordinates for postcode');
	}
};

const getLatLonFromCity = async (city: string): Promise<LatLon> => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${city},AU&limit=1&appid=${Config.WEATHER_API_SECRET_KEY}`,
		);
		const data = (await response.json()) as CityInfo[];
		const cityInfo = data[0];
		const lat = cityInfo.lat.toString();
		const lon = cityInfo.lon.toString();
		return { lat, lon } as LatLon;
	} catch (error) {
		throw new Error('Failed to retrieve geo co-ordinates for city');
	}
};

export const main = handler(async (event) => {
	if (!event.queryStringParameters) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message:
					'Need to provide a city, postcode, or geolocation co-ordinates',
			}),
		} as ReturnWithStatus;
	}

	let latLon = { lat: '', lon: '' } as LatLon;

	const queryStringLat = event.queryStringParameters?.lat ?? '';
	const queryStringLon = event.queryStringParameters?.lon ?? '';

	if (isValidNumber(queryStringLat) && isValidNumber(queryStringLon)) {
		latLon.lat = Number.parseFloat(queryStringLat).toString();
		latLon.lon = Number.parseFloat(queryStringLon).toString();
	} else if (isValidNumber(queryStringLat) || isValidNumber(queryStringLon)) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message:
					'Need to both latitude and longitude if providing geolocation co-ordinates',
			}),
		} as ReturnWithStatus;
	} else {
		const postcode = event.queryStringParameters.postcode ?? '';
		const city = event.queryStringParameters.city ?? '';

		if (!postcode && !city) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message:
						'Need to provide a city, postcode, or geolocation co-ordinates',
				}),
			} as ReturnWithStatus;
		}

		if (postcode !== '') {
			latLon = await getLatLonFromPostCode(postcode);
		} else {
			latLon = await getLatLonFromCity(city);
		}
	}

	return fetchTemp(latLon);
});
