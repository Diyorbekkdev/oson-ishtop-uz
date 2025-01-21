import { useSearchParams } from "@/hooks/useSearchParams";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

export const TableHeaderComponent = () => {
	const { setParams, getParams } = useSearchParams();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">Foydalanuvchilar</span>
				<Input
					placeholder="Qidiruv"
					className="max-w-xs"
					onChange={(e) => setParams({ search: e.target.value })}
					isClearable
					value={getParams("search") ?? ""}
					onClear={() => setParams({ search: "" })}
				/>
			</div>
			<Divider />
		</>
	);
};
