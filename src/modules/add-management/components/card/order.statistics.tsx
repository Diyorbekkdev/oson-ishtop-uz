import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
	Bar,
	BarChart,
	Label,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	XAxis,
	YAxis,
} from "recharts";
import { useDashboardFeatures } from "../../routes/add-management.features";
import { CalcPercent, FormatThousand } from "../../services/index";

const chartConfig: ChartConfig = {
	accept: {
		label: "accept",
		text: "Qabul qilingan",
		color: "#FF387B",
	},
	maked: {
		label: "maked",
		text: "Yakunlangan",
		color: "#4489F7",
	},
	reject: {
		label: "reject",
		text: "Rad etilgan",
		color: "#C6CFD7",
	},
};

const barchartConfig: ChartConfig = {
	paid: {
		label: "paid",
		text: "To'langan",
		color: "#FF387B",
	},
	notPaid: {
		label: "notPaid",
		text: "To'lanmagan",
		color: "#4489F7",
	},
	cash: {
		label: "cash",
		text: "Naqd",
		color: "#FFC107",
	},
	card: {
		label: "card",
		text: "Plastik",
		color: "#17DAE7",
	},
	transfer: {
		label: "transfer",
		text: "Pul o'tkazma",
		color: "#1E9DE7",
	},
	debt: {
		label: "debt",
		text: "Qarz",
		color: "#E4292A",
	},
};

export const OrderStatisticsCard = () => {
	const {
		data: { data: chart_data },
	} = useDashboardFeatures();

	const barChartData = chart_data?.chartData?.barChartData;
	const radialChartData = chart_data?.chartData?.radialChartData;

	const totalPrice =
		(chart_data?.chartData?.radialChartData?.accept || 0) +
		(chart_data?.chartData?.radialChartData?.maked || 0) +
		(chart_data?.chartData?.radialChartData?.reject || 0);

	return (
		<div className="grid grid-cols-2 gap-[20px] basis-[50%]">
			<Card className="flex flex-1 items-center p-[20px] dark:bg-dark-card shadow-none gap-2">
				<CardHeader className=" text-2xl font-[600] p-0">Zakazlar</CardHeader>
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-[2/1.5] w-full max-w-[250px] radial_chart_warpper"
				>
					<RadialBarChart
						data={[radialChartData]}
						endAngle={180}
						innerRadius={80}
						outerRadius={130}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								className="text-primary-1000 dark:text-white"
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="text-2xl font-bold "
												>
													{totalPrice.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground text-[14px]"
												>
													Jami zakazlar soni
												</tspan>
											</text>
										);
									}
									return null;
								}}
							/>
						</PolarRadiusAxis>
						{Object.values(chartConfig).map((item, index) => (
							<RadialBar
								key={index}
								dataKey={item.label as string}
								stackId="a"
								cornerRadius={5}
								fill={item.color}
								className="stroke-transparent stroke-2"
							/>
						))}
					</RadialBarChart>
				</ChartContainer>
				<CardFooter className="flex flex-col items-start gap-[5px] p-0 -mt-20">
					{Object.values(chartConfig).map((item, index) => {
						const value =
							chart_data?.chartData?.barChartData[
								item.label as keyof typeof chart_data.chartData.barChartData
							] || 0;
						return (
							<div key={`${item.label}_${index}`} className="w-full">
								{index === 0 && <Divider className="w-full" />}
								<div className="flex items-center gap-[10px] pb-1">
									<span
										className="w-[12px] h-[12px] rounded-[2px]"
										style={{ backgroundColor: item.color }}
									></span>
									<p className="flex flex-col ">
										<span className="text-[14px] text-[#8E9BA8]">
											{item.text}
										</span>
										<span className="text-[16px] font-[700]">
											{CalcPercent(+value, totalPrice)}% (
											{FormatThousand(+value)})
										</span>
									</p>
								</div>
								{index !== Object.values(chartConfig).length - 1 && (
									<Divider className="w-[70%]" />
								)}
							</div>
						);
					})}
				</CardFooter>
			</Card>
			<Card className="flex flex-1 items-center p-[20px] dark:bg-dark-card shadow-none gap-2">
				<CardHeader className=" text-2xl font-[600] p-0">
					Zakazlar summasi
				</CardHeader>
				<ChartContainer config={barchartConfig} className="w-full h-[40px]">
					<BarChart
						accessibilityLayer
						data={[barChartData]}
						layout="vertical"
						margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
						barSize={50}
					>
						<YAxis type="category" hide />
						<XAxis type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						{Object.values(barchartConfig).map((item, index) => (
							<Bar
								key={index}
								dataKey={item.label as string}
								stackId="a"
								radius={5}
								fill={item.color}
							/>
						))}
					</BarChart>
				</ChartContainer>
				<CardFooter className="flex flex-col items-start p-0">
					{Object.values(barchartConfig).map((item, index) => {
						const value =
							chart_data?.chartData?.barChartData[
								item.label as keyof typeof chart_data.chartData.barChartData
							] || 0;
						return (
							<div
								key={`${item.label}_${index}`}
								className="w-full border-b-1 border-solid border-[#EFF2F5] last:border-none dark:border-[#ebf7f127]"
							>
								<div className="flex items-center gap-[10px]">
									<span
										className="w-[12px] h-[12px] rounded-[2px]"
										style={{ backgroundColor: item.color }}
									></span>
									<div className="flex flex-1 items-center py-3">
										<span className="flex-1 text-[14px] text-[#8E9BA8]">
											{FormatThousand(+value)} - {FormatThousand(+value * 100)}
										</span>
										<span className="w-10 border-l-1 border-r-1 border-solid border-[#EFF2F5] dark:border-[#ebf7f127] text-center text-[14px] font-[700]">
											{CalcPercent(+value, totalPrice)}%
										</span>
										<span className="w-14 text-end text-[14px] font-[700]">
											{+value / 2}
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</CardFooter>
			</Card>
		</div>
	);
};
