import {
	Selection,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table";
import { useState } from "react";
import { renderCell } from "./cell";
import { products } from "./datas";
import { TopContent } from "./header/header";
import { BottomContent } from "./pagination/pagination";

const columns = [
	{ name: "№", uid: "product_id" },
	{ name: "Nomi", uid: "product_name" },
	{ name: "Narxi", uid: "price" },
	{ name: "Tan narxi", uid: "prime_cost" },
	{ name: "Foyda", uid: "profit" },
	{ name: "Foyda%", uid: "profit_percentage" },
	{ name: "Kategoriya", uid: "category" },
	{ name: "Ombor", uid: "storage" },
	{ name: "Hisoblash", uid: "calc" },
	{ name: "Tarix", uid: "history" },
];

export const ProductsTable = () => {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	const [clickedRows, setClickedRows] = useState<number[]>([]);

	const toggleRowClick = (rowId: number) => {
		setClickedRows((prev) =>
			prev.includes(rowId)
				? prev.filter((id) => id !== rowId)
				: [...prev, rowId],
		);
	};

	console.log(clickedRows);
	return (
		<Table
			aria-label="Example table with client side sorting"
			isHeaderSticky
			color="default"
			selectionMode="multiple"
			topContent={<TopContent products={23} selectedKeys={selectedKeys} />}
			bottomContent={
				<BottomContent
					page={1}
					setPage={() => console.log("hello")}
					pages={5}
				/>
			}
			selectedKeys={selectedKeys}
			onSelectionChange={setSelectedKeys}
			shadow="none"
			classNames={{
				wrapper: "dark:bg-dark-card",
				table: "min-h-[400px]",
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row ",
				th: "first:w-[50px]",
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={
							column.uid === "calc" || column.uid === "history"
								? "center"
								: "start"
						}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={products} isLoading={false}>
				{(item) => (
					<TableRow key={item.product_id}>
						{(columnKey) => (
							<TableCell>
								{renderCell(item, columnKey, toggleRowClick)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
