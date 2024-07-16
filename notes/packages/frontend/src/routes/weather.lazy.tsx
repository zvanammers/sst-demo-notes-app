import { createFileRoute } from '@tanstack/react-router';
import Weather from '../features/currentWeatherPage';

export const Route = createFileRoute('/weather')({
	component: Weather,
});
