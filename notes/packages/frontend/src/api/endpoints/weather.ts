import { useQuery } from '@tanstack/react-query';
import getConfig from '../../config';
import type currentWeather from '@models/currentWeather';
import axios from 'axios';
import type { FetchCurrentWeather } from '../models/fetchCurrentWeather';

const formatQueryStrings = (fetchCurrentWeather: FetchCurrentWeather) => {
	if (
		fetchCurrentWeather.locationType === 'Lat' ||
		fetchCurrentWeather.locationType === 'Location'
	) {
		if (fetchCurrentWeather.lat === '' && fetchCurrentWeather.lon === '') {
			return '';
		}
		if (fetchCurrentWeather.lat && fetchCurrentWeather.lon) {
			return `?lat=${fetchCurrentWeather.lat}&lon=${fetchCurrentWeather.lon}`;
		}
		if (fetchCurrentWeather.lat) {
			return `?lat=${fetchCurrentWeather.lat}`;
		}
		return `?lon=${fetchCurrentWeather.lon}`;
	}

	if (fetchCurrentWeather.locationType === 'Postcode') {
		return `?postcode=${fetchCurrentWeather.postcode}`;
	}
	if (fetchCurrentWeather.locationType === 'City') {
		return `?city=${fetchCurrentWeather.city}`;
	}
	return '';
};

export function useGetCurrentWeather(fetchCurrentWeather: FetchCurrentWeather) {
	return useQuery<currentWeather>({
		queryKey: ['weather'],
		queryFn: () =>
			axios
				.get(
					`${getConfig().apiUrl}/weather${formatQueryStrings(
						fetchCurrentWeather,
					)}`,
				)
				.then((res) => res.data),
		refetchOnWindowFocus: false,
	});
}
