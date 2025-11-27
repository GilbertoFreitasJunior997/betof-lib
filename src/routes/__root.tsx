import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { queryProviderDevtools } from '@/components/query-provider/consts';
import type { QueryContext } from '@/components/query-provider/types';

export const Route = createRootRouteWithContext<QueryContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackDevtools
				config={{
					position: 'bottom-right',
					hideUntilHover: true,
				}}
				plugins={[
					{
						name: 'Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
					queryProviderDevtools,
				]}
			/>
		</>
	),
});
