import { useSearchParams } from "@/hooks/useSearchParams";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";

const status = [
	{ key: "ALL", label: "ALL" },
	{ key: "WAITING", label: "WAITING" },
	{ key: "DRAFT", label: "DRAFT" },
	{ key: "ACCEPTED", label: "ACCEPTED" },
	{ key: "REJECTED", label: "REJECTED" },
	{ key: "ARCHIVE", label: "ARCHIVE" },
];

const headerLabel = {
	ALL: "Barcha E'lonlar",
	WAITING: "Kutilayotgan E'lonlar",
	DRAFT: "Qoralama E'lonlar",
	ACCEPTED: "Qabul qilingan E'lonlar",
	REJECTED: "Rad etilgan E'lonlar",
	ARCHIVE: "Arxivlangan E'lonlar",
};

export const TableHeaderComponent = () => {
	const { setParams, getParams } = useSearchParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<div className="text-3xl font-[600]">
					{headerLabel[
						(getParams("status") as keyof typeof headerLabel) ?? "ALL"
					] ?? "Barcha E'lonlar"}
				</div>
				<Select
					className="max-w-xs"
					label="E'lon statuslari"
					placeholder="Status Tanlang"
					onChange={(e) => setParams({ status: e.target.value })}
					selectedKeys={[getParams("status") ?? "ALL"]}
					value={getParams("status") ?? "ALL"}
				>
					{status.map((animal) => (
						<SelectItem key={animal.key}>{animal.label}</SelectItem>
					))}
				</Select>
			</div>
			<Divider />
		</>
	);
};
