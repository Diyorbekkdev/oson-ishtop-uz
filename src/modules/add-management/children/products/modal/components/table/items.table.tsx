import { Checkbox } from "@nextui-org/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table";
import { useProductModalFeatures } from "../../routes/modal.featchers";
import { useRenderCell } from "./cell";
import { TopContent } from "./header/item.top.content";

const columns = [
	{ name: <Checkbox color="default" />, uid: "checkbox" },
	{ name: "Nomi", uid: "ingredient_name" },
	{
		name: (
			<p>
				O'lchov <br /> birlgi
			</p>
		),
		uid: "unit",
	},
	{ name: "Guruh", uid: "ingredient_group" },
	{ name: "Narxi", uid: "price" },
	{ name: "Miqdori", uid: "input" },
];

export const ItemsTable = () => {
	const {
		data: { data = [], isLoading },
	} = useProductModalFeatures();
	const { render } = useRenderCell();

	return (
		<Table
			aria-label="Example table with client side sorting"
			isHeaderSticky
			color="default"
			topContent={<TopContent />}
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
						align={column.uid === "input" ? "center" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={data}
				isLoading={isLoading}
				loadingContent={<p>Loading...</p>}
			>
				{(item) => (
					<TableRow key={item.ingredient_id}>
						{(columnKey) => <TableCell>{render(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
