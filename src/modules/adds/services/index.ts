import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ADDS_MANAGEMENT, CONTENT, DATA, PARAMS } from "../model";

type ADDS_CACHE = {
	data: QueryResult<DATA>;
};
export const useAdminAdds = (): ADDS_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();

	const queryParams = useMemo(
		() => ({
			pageSize: getParams(ADDS_MANAGEMENT.PAGE_SIZE) || 10,
			page: getParams(ADDS_MANAGEMENT.PAGE) || 1,
			status: getParams(PARAMS.STATUS) || "ALL",
			tab: getParams(PARAMS.TAB) || PARAMS.WAITING,
			salaryFrom: getParams("priceFrom"),
			salaryTo: getParams("priceTo"),
			salary: getParams("salary"),
		}),
		[getParams],
	);

	const data = useQuery({
		queryKey: [
			`${ADDS_MANAGEMENT.DATA_KEY}?size=${queryParams.pageSize}&page=${queryParams.page}&status=${queryParams.tab}&salaryFrom=${queryParams.salaryFrom}&salaryTo=${queryParams.salaryTo}&salary=${queryParams.salary}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: DATA }>({
				functionName: `${ADDS_MANAGEMENT.DATA_PARAMS}?`,
				method: "POST",
				body: {
					page: queryParams.page,
					size: queryParams.pageSize,
					status: queryParams.tab,
					salaryFrom: queryParams.salaryFrom,
					salaryTo: queryParams.salaryTo,
					salary: queryParams.salary,
				},
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
