import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

export const queryProviderDevtools = {
	name: 'Query',
	render: <ReactQueryDevtoolsPanel />,
};
