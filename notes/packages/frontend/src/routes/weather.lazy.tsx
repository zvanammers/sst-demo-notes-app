import { createLazyFileRoute } from '@tanstack/react-router';
import Weather from '../components/weather';

export const Route = createLazyFileRoute('/weather')({
	component: Weather,
});
