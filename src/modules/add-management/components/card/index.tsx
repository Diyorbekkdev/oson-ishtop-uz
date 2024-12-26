import {
	WallletMinus,
	WallletMoney,
	Warning2,
} from "@/assets/icons/dashboard.icons";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import CountUp from "react-countup";
import { useDashboardFeatures } from "../../routes/add-management.features";

const cards_data = [
	{
		id: "card_1",
		text: "Kirimlar",
		name: "income",
		icon: <WallletMoney size={32} />,
		bg: "bg-[#16CC53]",
		value: 1240000000,
		unit: "so'm",
		sup: null,
	},
	{
		id: "card_2",
		text: "Chiqimlar",
		name: "expense",
		icon: <WallletMinus size={32} />,
		bg: "bg-[#E4292A]",
		value: 454,
		unit: "",
		sup: null,
	},
	{
		id: "card_3",
		text: "Yetkazuvchiga qarzlar",
		name: "expense_to_supplier",
		icon: <Warning2 size={32} />,
		bg: "bg-[#1E9DE7]",
		value: 12400,
		unit: "",
		sup: null,
	},
	{
		id: "card_4",
		text: "Yetkazuvchining qarzlari",
		name: "income_to_supplier",
		icon: <WallletMoney size={32} />,
		bg: "bg-[#17DAE7]",
		value: 124000,
		unit: "",
		sup: "-15%",
	},
];

type CardData = {
	income: number;
	expense: number;
	expense_to_supplier: number;
	income_to_supplier: number;
};

export const StatisticsCard = () => {
	const {
		data: { data: chart_data },
	} = useDashboardFeatures();
	return (
		<div className="grid grid-cols-2 gap-5 basis-[50%]">
			{cards_data.map((card) => (
				<Card
					key={card.id}
					className="w-full flex flex-col dark:bg-dark-card items-start p-5 shadow-none"
				>
					<CardHeader className="p-1">
						<span className={`${card.bg} p-[5px] rounded-[8px]`}>
							{card.icon}
						</span>
					</CardHeader>
					<CardBody className="p-1">
						<h2 className="text-primary-1000 dark:text-white font-bold text-3xl whitespace-nowrap">
							<CountUp
								end={Number(
									chart_data?.cards_data?.[card?.name as keyof CardData],
								)}
								separator=" "
							/>{" "}
							{card.unit}
							{card.sup && (
								<sup className="font-normal text-red-600"> {card.sup}</sup>
							)}
						</h2>
						<p className="text-[#8E9BA8]">{card.text}</p>
					</CardBody>
				</Card>
			))}
		</div>
	);
};
