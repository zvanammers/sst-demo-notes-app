import handler, { type ReturnWithStatus } from '@notes/core/handler';
import fetch from 'node-fetch';
import { Config } from 'sst/node/config';
import type { LatLon } from 'models/latLon';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { getLatLon } from './getLatLon';
import type ForecastWeather from '../../core/models/ForecastWeather';
import type SimpleForecastWeather from '../../core/models/SimpleForecastWeather';

const fetchTemp = async (latLon: LatLon): Promise<ForecastWeather> => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=${Config.WEATHER_API_SECRET_KEY}&units=metric`,
		);
		return (await response.json()) as ForecastWeather;
	} catch (error) {
		throw new Error('Could not fetch weather data');
	}
};

const processForecast = (
	forecast: ForecastWeather,
): SimpleForecastWeather[] => {
	const f: SimpleForecastWeather[] = [];
	for (let i = 0; i < forecast.list.length; i++) {
		const item = forecast.list[i];
		f.push({
			feels_like: item.main.feels_like,
			// dt: item.dt.toString(),
			dt: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
				hour12: true,
				timeZone: 'Australia/Sydney',
			}),
			temp: item.main.temp,
			humidity: item.main.humidity,
		});
	}
	return f;
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

	const stats = await fetchTemp(latLon as LatLon);
	const body = processForecast(stats) as SimpleForecastWeather[];
	return {
		statusCode: 200,
		body: JSON.stringify(body),
	} as ReturnWithStatus;
});
