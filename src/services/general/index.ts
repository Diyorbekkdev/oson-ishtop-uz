import { useHttpRequest } from "@/hooks/useHttpRequest";
import { QueryResult, TUser } from "@/types";
import { USER } from "@/types/enums/general";
import { useQuery } from "@tanstack/react-query";

type TGeneralService = {
	user: QueryResult<TUser>;
};

export const useGeneralService = (): TGeneralService => {
	const { functionInvoke } = useHttpRequest();

	const user = useQuery({
		queryKey: [USER.GET_USER],
		queryFn: async () => {
			const { data } = await functionInvoke<{ data: TUser }>({
				functionName: USER.GET_USER,
				method: "GET",
			});
			return data?.data;
		},
	});

	return {
		user,
	};
};
