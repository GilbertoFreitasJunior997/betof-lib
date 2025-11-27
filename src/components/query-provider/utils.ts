import { QueryClient } from '@tanstack/react-query';

export const getQueryContext = () => {
	const queryClient = new QueryClient();
	return {
		queryClient,
	};
};
