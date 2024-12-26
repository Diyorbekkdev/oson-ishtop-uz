import { UseQueryResult, useQuery } from "@tanstack/react-query";

type TCardData = {
	income: number;
	expense: number;
	expense_to_supplier: number;
	income_to_supplier: number;
};

type TBarChartData = {
	order: string;
	paid: number;
	notPaid: number;
	cash: number;
	card: number;
	transfer: number;
	debt: number;
};

type TRadialChartData = {
	month: string;
	accept: number;
	maked: number;
	reject: number;
};

type TDashboardData = {
	cards_data: TCardData;
	chartData: {
		barChartData: TBarChartData;
		radialChartData: TRadialChartData;
	};
};

type TDashboardFeatures = {
	data: UseQueryResult<TDashboardData, unknown>;
};

// Mock data
const barChartData: TBarChartData = {
	order: "orders",
	paid: 187,
	notPaid: 90,
	cash: 100,
	card: 77,
	transfer: 20,
	debt: 80,
};

const cards_data: TCardData = {
	income: 1240000000,
	expense: 454,
	expense_to_supplier: 12400,
	income_to_supplier: 124000,
};

const radialChartData: TRadialChartData = {
	month: "January",
	accept: 1260,
	maked: 570,
	reject: 300,
};

// Custom hook for fetching dashboard data
export const useDashboardFeatures = (): TDashboardFeatures => {
	const data = useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			return { cards_data, chartData: { barChartData, radialChartData } };
		},
	});

	return {
		data,
	};
};
