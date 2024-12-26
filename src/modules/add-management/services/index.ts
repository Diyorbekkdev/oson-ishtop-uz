import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useQuery } from "@tanstack/react-query";
import { ADD_DATA, ADD_MANAGEMENT } from "../model";
import { QueryResult } from "@/types";
import { useSearchParams } from "@/hooks/useSearchParams";

export const CalcPercent = (value: number, total: number) => {
  const percent = (value / total) * 100;
  return percent.toFixed(0);
};

export const FormatThousand = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

type ADD_MANAGEMENT_CACHE = {
  data: QueryResult<ADD_DATA>;
};
export const useAddManagementCache = (): ADD_MANAGEMENT_CACHE => {
  const { functionInvoke } = useHttpRequest();
  const { getParams } = useSearchParams();

  const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
  const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

  const data = useQuery({
    queryKey: [`${ADD_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
    queryFn: async () => {
      const { data } = await functionInvoke<{ data: ADD_DATA }>({
        functionName: `${ADD_MANAGEMENT.DATA_PARAMS}?10=${pageSize}&page=${page}`,
        method: "GET",
      });
      return data?.data;
    },
  });

  return { data };
};
