import { Card } from "@nextui-org/card";
import { CalcTable } from "./calc.table";
import { ModalFormContent } from "./header/form";
import { ItemsTable } from "./items.table";

export const ProductModalTable = () => {
	return (
		<Card
			className="dark:bg-dark-card grid gap-1 grid-cols-2 grid-rows-[auto_1fr]"
			shadow="none"
		>
			<ModalFormContent />
			<ItemsTable />
			<CalcTable />
		</Card>
	);
};
