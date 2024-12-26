import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import RegionsPage from "./regions.component";

export const RegionRoutes = [
	{
		path: "/regions",
		title: "Joylashuvlar",
		element: <RegionsPage />,
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
