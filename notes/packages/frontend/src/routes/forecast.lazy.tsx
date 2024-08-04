import { createLazyFileRoute } from '@tanstack/react-router';
import WeatherForecastPage from '../features/WeatherForecastPage';

export const Route = createLazyFileRoute('/forecast')({
	component: WeatherForecastPage,
});
