import { createLazyFileRoute } from '@tanstack/react-router';
import PlantPage from '../pages/plantPage';

export const Route = createLazyFileRoute('/plants')({
	component: PlantPage,
});
