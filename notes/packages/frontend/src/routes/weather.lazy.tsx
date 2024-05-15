import { createLazyFileRoute } from '@tanstack/react-router';
import Weather from '../features/currentWeatherPage';

export const Route = createLazyFileRoute('/weather')({
	component: Weather,
});
