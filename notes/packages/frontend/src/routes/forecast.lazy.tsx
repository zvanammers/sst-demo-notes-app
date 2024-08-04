import { createLazyFileRoute } from '@tanstack/react-router';
import Forecast from '../features/weatherForecastPage';

export const Route = createLazyFileRoute('/forecast')({
	component: Forecast,
});
