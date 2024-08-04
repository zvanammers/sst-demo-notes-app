import { createLazyFileRoute } from '@tanstack/react-router';
import WeatherForecastPage from '../features/xweatherForecastPage';

export const Route = createLazyFileRoute('/forecast')({
	component: WeatherForecastPage,
});
