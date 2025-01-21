import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import AddsPage from "./adds.component";

export const AddsRoutes = [
	{
		path: "/adds",
		title: "E'lonlar",
		element: <AddsPage />,
		icon: <HomeIcon />,
		id: 1,
		hasChild: false,
		roles: [
			"owner",
			"manager",
			"accountant",
			"waiter",
			"chef",
			"barman",
			"runner",
		],
		children: [],
	},
];
