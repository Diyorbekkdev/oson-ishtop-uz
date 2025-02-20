import { useSearchParams } from "@/hooks/useSearchParams";
import { Divider } from "@nextui-org/divider";
import { Slider } from "@nextui-org/slider";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";

const headerLabel = {
	ALL: "Barcha E'lonlar",
	WAITING: "Yangi E'lonlar",
	DRAFT: "Qoralama E'lonlar",
	ACCEPTED: "Qabul qilingan E'lonlar",
	REJECTED: "Rad etilgan E'lonlar",
	ARCHIVE: "Arxivlangan E'lonlar",
};

export const TableHeaderComponent = () => {
	const { getParams, setParams } = useSearchParams();
	const priceFrom = getParams("priceFrom") ?? 0;
	const priceTo = getParams("priceTo") ?? 500000;
	const [priceRange, setPriceRange] = useState<[number, number]>([
		Number(priceFrom),
		Number(priceTo),
	]);

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="text-3xl font-[600]">
					{headerLabel[
						(getParams("tab") as keyof typeof headerLabel) ?? "ALL"
					] ?? "Barcha E'lonlar"}
				</div>
				<div className="flex items-center gap-4 basis-[30%]">
					<Slider
						className="max-w-md"
						defaultValue={priceRange}
						formatOptions={{
							style: "currency",
							currency: getParams("salary") === "UZS" ? "UZS" : "USD",
						}}
						label="Price Range"
						maxValue={getParams("salary") === "UZS" ? 10000000 : 1000}
						minValue={0}
						step={50}
						color="success"
						value={priceRange}
						onChange={(e: any) => {
							setPriceRange([e[0], e[1]]);
						}}
						onChangeEnd={(e: any) => {
							setParams({ priceFrom: String(e[0]), priceTo: String(e[1]) });
						}}
					/>
					<div>
						<Tabs
							color="success"
							selectedKey={getParams("salary") ?? "UZS"}
							onSelectionChange={(key) => {
								setParams({
									salary: String(key),
								});
							}}
						>
							<Tab key={"UZS"} title="UZS" />
							<Tab key={"USD"} title="USD" />
						</Tabs>
					</div>
				</div>
			</div>
			<Divider />
		</>
	);
};
