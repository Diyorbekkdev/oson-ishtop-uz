import { useSearchParams } from "@/hooks/useSearchParams";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

export const TableHeaderComponent = () => {
	const { setParams } = useSearchParams();
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-[600]">Foydalanuvchilar</span>
				<Input
					placeholder="Qidiruv"
					className="max-w-xs"
					onChange={(e) => setParams({ search: e.target.value })}
					isClearable
					onClear={() => setParams({ search: "" })}
				/>
			</div>
			<Divider />
		</>
	);
};
