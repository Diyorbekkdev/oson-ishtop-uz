import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
	ADD_DATA,
	AREAS,
	AREAS_DATA,
	PARAMS,
	REGION_MANAGEMENT,
} from "../model";

type ADD_MANAGEMENT_CACHE = {
	data: QueryResult<ADD_DATA>;
	areas: QueryResult<AREAS_DATA>;
};
export const useAddManagementCache = (): ADD_MANAGEMENT_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();
	const regionId = getParams(PARAMS.REGION_ID);

	const pageSize = getParams(REGION_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(REGION_MANAGEMENT.PAGE) || 1;

	const data = useQuery({
		queryKey: [`${REGION_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: ADD_DATA }>({
				functionName: `${REGION_MANAGEMENT.DATA_PARAMS}?10=${pageSize}&page=${page}`,
				method: "GET",
			});
			return data?.data;
		},
		enabled: !regionId,
	});

	const areas = useQuery({
		queryKey: [
			`${AREAS.DATA_KEY}?10=${pageSize}&page=${page}&regionsId=${regionId}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: AREAS_DATA }>({
				functionName: `${AREAS.DATA_PARAMS}?10=${pageSize}&page=${page}&regionsId=${regionId}`,
				method: "GET",
			});
			return data?.data;
		},
		enabled: Boolean(regionId),
	});

	return { data, areas };
};
