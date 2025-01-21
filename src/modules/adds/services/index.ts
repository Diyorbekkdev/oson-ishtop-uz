import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ADDS_MANAGEMENT, CONTENT, DATA, PARAMS } from "../model";

type ADDS_CACHE = {
	data: QueryResult<DATA>;
};
export const useAdminAdds = (): ADDS_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();

	const pageSize = getParams(ADDS_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADDS_MANAGEMENT.PAGE) || 1;
	const status = getParams(PARAMS.STATUS) || "ALL";

	const data = useQuery({
		queryKey: [
			`${ADDS_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&status=${status}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: DATA }>({
				functionName: `${ADDS_MANAGEMENT.DATA_PARAMS}?size=${pageSize}&page=${page}&status=${status}`,
				method: "GET",
			});
			return data?.data;
		},
	});

	return { data };
};

type SELECTED_ADD_CACHE = {
	data: QueryResult<CONTENT>;
};
export const useSelectedAddCache = (): SELECTED_ADD_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();

	const data = useQuery({
		queryKey: [
			`${ADDS_MANAGEMENT.SELECTED_DATA_KEY}/${getParams(PARAMS.ADD_ID)}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: CONTENT }>({
				functionName: `${ADDS_MANAGEMENT.SELECTED_DATA_PARAMS}/${getParams(
					PARAMS.ADD_ID,
				)}`,
				method: "GET",
				headers: {
					"Content-Language": "EN",
				},
			});
			return data?.data;
		},
	});

	return { data };
};
