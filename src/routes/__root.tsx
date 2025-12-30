import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryContext } from '@/components/query-provider/types';

export const Route = createRootRouteWithContext<QueryContext>()({
	component: () => (
		<>
			<Outlet />
		</>
	),
});
