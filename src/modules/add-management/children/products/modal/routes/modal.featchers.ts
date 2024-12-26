import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { items } from "../components/table/datas";

type TIngredientsData = {
	ingredient_id: string;
	ingredient_name: string;
	unit: string;
	index: number;
	ingredient_group: string;
	price: number;
};

type TIngFeatures = {
	data: UseQueryResult<TIngredientsData[], unknown>;
};

// Custom hook for fetching dashboard data
export const useProductModalFeatures = (): TIngFeatures => {
	const data = useQuery({
		queryKey: ["ingredients"],
		queryFn: async () => {
			return items;
		},
	});

	return {
		data,
	};
};
