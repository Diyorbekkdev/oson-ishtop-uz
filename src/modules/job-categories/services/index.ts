import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
	CHILD_CATEGORIES_MANAGEMENT,
	CHILD_DATA,
	JOB_CATEGORIES_MANAGEMENT,
	PARAMS,
	PARENT_DATA,
} from "../model";

type ADD_MANAGEMENT_CACHE = {
	data: QueryResult<PARENT_DATA>;
	child_data: QueryResult<CHILD_DATA>;
};
export const useJobCategoriesCache = (): ADD_MANAGEMENT_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();
	const categoryId = getParams(PARAMS.CATEGORY_ID);

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const data = useQuery({
		queryKey: [
			`${JOB_CATEGORIES_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: PARENT_DATA }>({
				functionName: `${JOB_CATEGORIES_MANAGEMENT.DATA_PARAMS}?size=${pageSize}&page=${page}`,
				method: "GET",
			});
			return data?.data;
		},
		enabled: !categoryId,
	});

	const child_data = useQuery({
		queryKey: [
			`${CHILD_CATEGORIES_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&parentId=${categoryId}`,
		],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: CHILD_DATA }>({
				functionName: `${CHILD_CATEGORIES_MANAGEMENT.DATA_PARAMS}?size=${pageSize}&page=${page}&parentId=${categoryId}`,
				method: "GET",
			});
			return data?.data;
		},
		enabled: Boolean(categoryId),
	});

	return { data, child_data };
};
