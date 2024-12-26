import ProductModal from "..";

export const ProductModalRoute = [
	{
		path: "add",
		title: "Products Add",
		element: <ProductModal />,
		id: "1.1.1",
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
