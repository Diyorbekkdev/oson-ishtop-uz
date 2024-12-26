import Products from "..";
import { ProductModalRoute } from "../modal/routes";

export const ProductsRoute = [
	{
		path: "products",
		title: "Products",
		element: <Products />,
		id: "1.1",
		hasChild: true,
		children: [...ProductModalRoute],
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
