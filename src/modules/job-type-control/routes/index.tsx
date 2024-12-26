import { HomeIcon } from "@/assets/icons/sidebar/home.icon";
import JobTypeControl from "..";

export const JobTypeControlRoutes = [
	{
		path: "/job-type-control",
		title: "Job Type Control",
		element: <JobTypeControl />,
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
