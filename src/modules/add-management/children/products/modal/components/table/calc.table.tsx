import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table";
import { useProductModalFeatures } from "../../routes/modal.featchers";
import { CalcBottomContent } from "./bottom/calc.bottom.content";
// import { renderCell } from "./cell";
import { renderCell } from "./cell/calc.render.cell";

const columns = [
	{ name: "№", uid: "index" },
	{ name: "Nomi", uid: "ingredient_name" },
	{ name: "Miqdori", uid: "amount" },
	{ name: "Tan Narxi", uid: "price" },
	{ name: "Narxi", uid: "total_prie" },
];

export const CalcTable = () => {
	const {
		data: { data = [], isLoading },
	} = useProductModalFeatures();

	return (
		<Table
			aria-label="Example table with client side sorting"
			isHeaderSticky
			color="default"
			bottomContent={
				<CalcBottomContent prime_cost={0} profit={0} profit_percent={0} />
			}
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
						align={column.uid === "ingredient_name" ? "start" : "end"}
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
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
