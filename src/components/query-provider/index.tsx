import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const QueryProvider = ({
	children,
	queryClient,
}: PropsWithChildren<{ queryClient: QueryClient }>) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
