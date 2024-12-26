import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import JobCategoriesPage from "./job-categories.component";

export const JobCategoriesRoute = [
	{
		path: "/job-categories",
		title: "Ann Job Categories",
		element: <JobCategoriesPage />,
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
