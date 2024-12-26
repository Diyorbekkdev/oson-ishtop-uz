import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@nextui-org/table";

export const InnerTable = () => {
	return (
		<Table aria-label="Inner table for product details">
			<TableHeader>
				<TableRow>
					<TableCell>Nomi</TableCell>
					<TableCell>Narxi</TableCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Product 1</TableCell>
					<TableCell>1000 so'm</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Product 2</TableCell>
					<TableCell>2000 so'm</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Product 3</TableCell>
					<TableCell>3000 so'm</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};
