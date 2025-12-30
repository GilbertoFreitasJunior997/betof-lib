import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryProvider } from './components/query-provider';
import { getQueryContext } from './components/query-provider/utils';
import { routeTree } from './routeTree.gen';
import './styles.css';
import { Toaster } from './components/toaster';

const queryContext = getQueryContext();
const router = createRouter({
	routeTree,
	context: queryContext,
	defaultPreload: 'intent',
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryProvider {...queryContext}>
				<Toaster />
				<RouterProvider router={router} />
			</QueryProvider>
		</StrictMode>,
	);
}
