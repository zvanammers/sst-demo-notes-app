import { createLazyFileRoute } from '@tanstack/react-router';
import Weather from '../features/weatherPage';

export const Route = createLazyFileRoute('/weather')({
	component: Weather,
});
