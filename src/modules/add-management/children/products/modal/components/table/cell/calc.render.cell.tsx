type TRenderCell = {
	ingredient_id: string;
	ingredient_name: string;
	unit: string;
	index: number;
	ingredient_group: string;
	price: number;
};

export const renderCell = (item: TRenderCell, columnKey: string | number) => {
	const cellValue = item[columnKey as keyof TRenderCell];

	switch (columnKey) {
		case "index":
			return <span>{cellValue}.</span>;
		default:
			return <span>{cellValue}</span>;
	}
};
