import handler, { type ReturnWithStatus } from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import type CurrentWeather from '../../core/models/currentWeather';
import type { LatLon } from 'models/latLon';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { getLatLon } from './getLatLon';

const fetchTemp = async (latLon: LatLon) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
		);

		const body = (await response.json()) as CurrentWeather;
		return {
			statusCode: 200,
			body: JSON.stringify(body),
		} as ReturnWithStatus;
	} catch (error) {
		throw new Error('Could not fetch weather data');
	}
};

export const main = handler(async (event: APIGatewayProxyEvent) => {
	if (!event.queryStringParameters) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message:
					'Need to provide a city, postcode, or geolocation co-ordinates',
			}),
		} as ReturnWithStatus;
	}

	const latLon = await getLatLon(event.queryStringParameters);

	if ('status' in latLon) {
		return latLon as ReturnWithStatus;
	}

	return fetchTemp(latLon as LatLon);
});
