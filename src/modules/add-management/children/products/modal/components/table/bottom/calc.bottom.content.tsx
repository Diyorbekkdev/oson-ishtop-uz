import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

type TCalcBottomContent = {
	prime_cost: number;
	profit: number;
	profit_percent: number;
};

export const CalcBottomContent = ({
	prime_cost = 0,
	profit = 0,
	profit_percent = 0,
}: TCalcBottomContent) => {
	return (
		<Card className="flex flex-col" shadow="none">
			<Divider className="mb-1" />
			<p className="w-full flex items-center justify-between px-2 py-1">
				Tan narx: <span>{prime_cost}</span>
			</p>
			<Divider />
			<p className="w-full flex items-center justify-between px-2 py-1">
				Foyda: <span>{profit}</span>
			</p>
			<Divider />
			<p className="w-full flex items-center justify-between px-2 py-1">
				Foyda (%): <span>{profit_percent}</span>
			</p>
		</Card>
	);
};
