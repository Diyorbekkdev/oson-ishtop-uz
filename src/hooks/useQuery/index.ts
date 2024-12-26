import { QueryKey, useQueryClient } from "@tanstack/react-query";

type AppQuery = {
	getCacheKeys: (e: string) => QueryKey[] | undefined;
};

export const useAppQuery = (): AppQuery => {
	const queryClient = useQueryClient();

	const getCacheKeys = (e: string) => {
		const allKeys = queryClient.getQueryCache().getAll();

		return allKeys
			.filter(({ queryKey }) => queryKey.includes(e))
			.map(({ queryKey }) => queryKey);
	};

	return {
		getCacheKeys,
	};
};
