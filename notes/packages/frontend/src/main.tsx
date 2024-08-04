import { StrictMode, useState } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
		},
	},
});

// import { createContext } from 'react';

// const ThemeContext = createContext('light');

// const [theme, setTheme] = useState('light');

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				{/* <ThemeContext.Provider value={'dark'}> */}
				<RouterProvider router={router} />
				{/* </ThemeContext.Provider> */}
			</QueryClientProvider>
		</StrictMode>,
	);
}
