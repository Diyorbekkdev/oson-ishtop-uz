import { Button } from "@nextui-org/button";

type TRenderCell = {
	product_id: number;
	product_name: string;
	price: number;
	prime_cost: number;
	profit: number;
	profit_percentage: number;
	category: string;
	storage: string;
};

export const renderCell = (
	user: TRenderCell,
	columnKey: string | number,
	toggleRowClick: (rowId: number) => void,
) => {
	const cellValue = user[columnKey as keyof TRenderCell];
	switch (columnKey) {
		case "price":
			return (
				<span className="flex items-center gap-2">
					{cellValue} <small>so'm</small>
				</span>
			);
		case "prime_cost":
			return (
				<span className="flex items-center gap-2">
					{cellValue} <small>so'm</small>
				</span>
			);
		case "profit":
			return (
				<span className="flex items-center gap-2">
					{cellValue} <small>so'm</small>
				</span>
			);
		case "profit_percentage":
			return (
				<span className="flex items-center gap-2">
					{cellValue} <small>%</small>
				</span>
			);
		case "calc":
			return <Button size="sm">Hisoblash</Button>;
		case "history":
			return (
				<Button size="sm" onClick={() => toggleRowClick?.(user?.product_id)}>
					Tarix
				</Button>
			);
		default:
			return cellValue;
	}
};
