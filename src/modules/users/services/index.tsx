import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
	DATA,
	PARAMS,
	TRANSACTION_DATA,
	USER_MANAGEMENT,
	USER_TRANSACTION,
} from "../model";

type USER_MANAGEMENT_CACHE = {
	data: QueryResult<DATA>;
};
export const useAdminUsersCache = (): USER_MANAGEMENT_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();

	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const data = useQuery({
		queryKey: [
			`${USER_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&search=${search}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: DATA }>({
				functionName: `${USER_MANAGEMENT.DATA_PARAMS}?size=${pageSize}&page=${page}&search=${search}`,
				method: "GET",
			});
			return data?.data;
		},
	});

	return { data };
};

type USER_TRANSACTION_CACHE = {
	data: QueryResult<TRANSACTION_DATA>;
};

export const useAdminUserTransactionsCache = (): USER_TRANSACTION_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();
	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const source = getParams(PARAMS.SOURCE) || "";
	const userId = getParams(PARAMS.USER_ID);

	const data = useQuery({
		queryKey: [
			`${USER_TRANSACTION.DATA_KEY}?size=${pageSize}&page=${page}&userId=${userId}&source=${source}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: TRANSACTION_DATA }>({
				functionName: `${USER_TRANSACTION.DATA_PARAMS}?size=${pageSize}&page=${page}&userId=${userId}&source=${source}`,
				method: "GET",
			});
			return data?.data;
		},
		enabled: Boolean(userId),
	});

	return { data };
};
