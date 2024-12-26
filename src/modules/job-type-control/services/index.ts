import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { QueryResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { JOB_TYPE_CONTROL, JOB_TYPE_CONTROL_DATA } from "../model";

type JOB_TYPE_CONTROL_CACHE = {
	data: QueryResult<JOB_TYPE_CONTROL_DATA>;
};
export const useJobTypeControlCache = (): JOB_TYPE_CONTROL_CACHE => {
	const { functionInvoke } = useHttpRequest();
	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_TYPE_CONTROL.PAGE_SIZE) || 10;
	const page = getParams(JOB_TYPE_CONTROL.PAGE) || 1;

	const data = useQuery({
		queryKey: [`${JOB_TYPE_CONTROL.DATA_KEY}?10=${pageSize}&page=${page}`],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: JOB_TYPE_CONTROL_DATA }>({
				functionName: `${JOB_TYPE_CONTROL.DATA_PARAMS}?size=${pageSize}&page=${page}`,
				method: "GET",
			});
			return data?.data;
		},
	});

	return { data };
};
