import getConfig from '../../config';
import axios from 'axios';
import type { FetchWeather } from '../models/fetchWeather';

const formatQueryStrings = (fetchWeatherForecast: FetchWeather) => {
	if (
		fetchWeatherForecast.locationType === 'Lat' ||
		fetchWeatherForecast.locationType === 'Location'
	) {
		if (fetchWeatherForecast.lat === '' && fetchWeatherForecast.lon === '') {
			return '';
		}
		if (fetchWeatherForecast.lat && fetchWeatherForecast.lon) {
			return `?lat=${fetchWeatherForecast.lat}&lon=${fetchWeatherForecast.lon}`;
		}
		if (fetchWeatherForecast.lat) {
			return `?lat=${fetchWeatherForecast.lat}`;
		}
		return `?lon=${fetchWeatherForecast.lon}`;
	}

	if (fetchWeatherForecast.locationType === 'Postcode') {
		return `?postcode=${fetchWeatherForecast.postcode}`;
	}
	if (
		fetchWeatherForecast.locationType === 'City' ||
		fetchWeatherForecast.locationType === 'Bookmarks'
	) {
		return `?city=${fetchWeatherForecast.city}`;
	}
	return '';
};

export async function useGetCurrentWeather(fetchCurrentWeather: FetchWeather) {
	const res = await axios.get(
		`${getConfig().apiUrl}/weather${formatQueryStrings(fetchCurrentWeather)}`,
	);
	return res.data;
}

export async function useGetForecast(fetchWeather: FetchWeather) {
	const res = await axios.get(
		`${getConfig().apiUrl}/forecast${formatQueryStrings(fetchWeather)}`,
	);
	return res.data;
}
