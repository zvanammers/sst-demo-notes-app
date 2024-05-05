import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('app')!;
console.log(rootElement);
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}
