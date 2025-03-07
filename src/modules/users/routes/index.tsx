import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import UsersPage from "./users.component";

export const UsersRoutes = [
	{
		path: "/users",
		title: "Foydalanuvchilar",
		element: <UsersPage />,
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
