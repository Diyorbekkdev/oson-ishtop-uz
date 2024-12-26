import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table";
import { renderCell } from "./cell";
import { ingredients } from "./datas";
import { InvTableHeader } from "./header/header";
import { BottomContent } from "./pagination/pagination";

const columns = [
	{ name: "№", uid: "ingredient_id" },
	{ name: "Nomi", uid: "ingredient_name" },
	{ name: "Guruh", uid: "group" },
	{ name: "Turi", uid: "type" },
	{ name: "Narxi", uid: "price" },
	{ name: "Miqdori", uid: "amount" },
];

export const InvetoryTable = () => {
	return (
		<>
			<Table
				aria-label="Example table with client side sorting"
				isHeaderSticky
				color="default"
				topContent={<InvTableHeader workers={23} />}
				bottomContent={
					<BottomContent
						page={1}
						setPage={() => console.log("hello")}
						pages={5}
					/>
				}
				shadow="none"
				classNames={{
					wrapper: "dark:bg-dark-card",
					table: "min-h-[400px]",
					tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
					th: "first:w-[50px]",
				}}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid}>{column.name}</TableColumn>
					)}
				</TableHeader>
				<TableBody items={ingredients} isLoading={false}>
					{(item) => (
						<TableRow key={item.ingredient_id}>
							{(columnKey) => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};
