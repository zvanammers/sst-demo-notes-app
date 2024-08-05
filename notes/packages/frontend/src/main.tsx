import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

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

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#eb896c',
						},
						components: {
							Menu: {
								darkItemSelectedBg: '#eb896c',
							},
						},
					}}
				>
					<RouterProvider router={router} />
				</ConfigProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
}
