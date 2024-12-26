import { IngredientIcon } from "@/assets/icons/inventory.icons";

type TRenderCell = {
	ingredient_id: number;
	ingredient_name: string;
	group: string;
	type: string;
	price: number;
	amount: number;
	unit: string;
};

export const renderCell = (user: TRenderCell, columnKey: string | number) => {
	const cellValue = user[columnKey as keyof TRenderCell];
	switch (columnKey) {
		case "group":
			return (
				<div className="relative flex items-center gap-2">
					<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
						<IngredientIcon size={21} />
					</span>
					{cellValue}
				</div>
			);
		case "amount":
			return (
				<span>
					{cellValue} <small>{user.unit}</small>
				</span>
			);
		default:
			return cellValue;
	}
};
