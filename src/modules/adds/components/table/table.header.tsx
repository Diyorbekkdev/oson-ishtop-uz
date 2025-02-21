import { ChevronDownIcon } from "@/assets/icons/sidebar/chevrow-down.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { Slider } from "@heroui/slider";
import { Tab, Tabs } from "@heroui/tabs";
import { capitalize } from "lodash";
import { useState } from "react";

const headerLabel = {
	ALL: "Barcha E'lonlar",
	WAITING: "Yangi E'lonlar",
	DRAFT: "Qoralama E'lonlar",
	ACCEPTED: "Qabul qilingan E'lonlar",
	REJECTED: "Rad etilgan E'lonlar",
	ARCHIVE: "Arxivlangan E'lonlar",
};

const statusOptions = [
	{ name: "ASCENDING", uid: "ASCENDING" },
	{ name: "DESCENDING", uid: "DESCENDING" },
];

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
				<div className="flex items-center gap-4 basis-[35%]">
					<div>
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									variant="flat"
								>
									Sort{" "}
									{statusOptions.find(
										(status) => status.uid === getParams("sort"),
									)?.name ?? ""}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={[getParams("sort") ?? ""] as any}
								selectionMode="single"
								// onSelectionChange={(e: any) => {
								//   setParams({ sort: String(e.currentKey) });
								// }}
								onSelectionChange={(e: any) => {
									setParams({ sort: String(e.currentKey) });
								}}
							>
								{statusOptions.map((status) => (
									<DropdownItem key={status.uid} className="capitalize">
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
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
							onSelectionChange={(key: any) => {
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
