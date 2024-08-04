import { createFileRoute } from '@tanstack/react-router';
import CurrentWeatherPage from '../features/xcurrentWeatherPage';

export const Route = createFileRoute('/weather')({
	component: CurrentWeatherPage,
});
