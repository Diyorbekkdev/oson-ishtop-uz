import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import AddManagement from "..";

export const AddManagementRoute = [
	{
		path: "/add-management",
		title: "E'lon Boshqaruvi",
		element: <AddManagement />,
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
		children: [
		
		],
	},
];
