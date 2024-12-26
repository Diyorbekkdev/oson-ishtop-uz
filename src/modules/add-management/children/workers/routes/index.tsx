import Workers from "..";

export const WorkersRoute = [
	{
		path: "workers",
		title: "Workers",
		element: <Workers />,
		id: 6,
		hasChild: false,
		children: [],
		roles: [
			"owner",
			"manager",
			"accountant",
			"waiter",
			"chef",
			"barman",
			"runner",
		],
	},
];
