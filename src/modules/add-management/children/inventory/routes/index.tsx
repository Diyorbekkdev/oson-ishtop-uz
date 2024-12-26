import Inventory from "..";

export const InventoryRoute = [
	{
		path: "inventory",
		title: "Inventory",
		element: <Inventory />,
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
