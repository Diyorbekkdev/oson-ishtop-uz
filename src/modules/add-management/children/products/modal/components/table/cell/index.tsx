import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { useState } from "react";

type TRenderCell = {
	ingredient_id: string;
	ingredient_name: string;
	unit: string;
	index: number;
	ingredient_group: string;
	price: number;
};

export const useRenderCell = () => {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	console.log("selectedKeys", selectedKeys);

	const addId = (id: string) => {
		setSelectedKeys((prevSelectedKeys) => {
			if (prevSelectedKeys.includes(id)) {
				return prevSelectedKeys.filter((key) => key !== id);
			} else {
				return [...prevSelectedKeys, id];
			}
		});
	};

	const render = (item: TRenderCell, columnKey: string | number) => {
		const cellValue = item[columnKey as keyof TRenderCell];

		switch (columnKey) {
			case "input":
				return selectedKeys.includes(item.ingredient_id) ? (
					<Input
						type="number"
						placeholder="Miqdor"
						size="sm"
						className="w-full"
						radius="sm"
						defaultValue={cellValue as string}
						onChange={(e) => console.log(e.target.value)}
						onClickCapture={(e) => e.stopPropagation()}
					/>
				) : (
					<span>tanlang</span>
				);
			case "checkbox":
				return (
					<Checkbox color="default" onClick={() => addId(item.ingredient_id)} />
				);
			default:
				return <span>{cellValue}</span>;
		}
	};

	return {
		render,
	};
};
