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
import { workers } from "../../../../components/table/datas";
import { renderCell } from "./cell";
import { TopContent } from "./header/header";
import { BottomContent } from "./pagination/pagination";

const columns = [
	{ name: "№", uid: "worker_id" },
	{ name: "Ismi", uid: "worker" },
	{ name: "Parol", uid: "pin" },
	{ name: "B'lim", uid: "cashbox_id" },
	{ name: "Kod", uid: "worker_pass" },
	{ name: "Amallar", uid: "action" },
];

export const WorkerTable = () => {
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	return (
		<Table
			aria-label="Example table with client side sorting"
			isHeaderSticky
			color="default"
			selectionMode="multiple"
			topContent={<TopContent workers={23} selectedKeys={selectedKeys} />}
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
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
				th: "first:w-[50px]",
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "action" ? "end" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={workers} isLoading={false}>
				{(item) => (
					<TableRow key={item.worker_id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
