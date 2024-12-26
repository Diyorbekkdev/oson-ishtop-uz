import {
	AddIcon,
	DeleteIcon,
	SearchIcon,
} from "@/assets/icons/global/gloval.icons";
import { Button } from "@nextui-org/button";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/table";
import { useNavigate } from "react-router-dom";

type TTopContent = {
	products: number;
	selectedKeys: Selection & { size?: number };
};

export const TopContent = ({ products, selectedKeys }: TTopContent) => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between">
			<span className="flex flex-col text-2xl font-[600]">
				Mahsulotlar{" "}
				<small className="text-xs text-[#8E9BA8]">{products} ta mahsulot</small>
			</span>
			<div className="flex items-center gap-4">
				<Select
					items={[
						{ key: "1", label: "group 1" },
						{ key: "2", label: "group 2" },
						{ key: "3", label: "group 3" },
					]}
					placeholder="Guruh tanlang"
					className="min-w-[160px]"
					radius="sm"
				>
					{(group) => <SelectItem key={group.key}>{group.label}</SelectItem>}
				</Select>
				<DateRangePicker showMonthAndYearPickers radius="sm" />
				<Input
					type="email"
					placeholder="Izlash"
					radius="sm"
					className="min-w-[200px]"
					startContent={
						<SearchIcon className="pointer-events-none" size={20} />
					}
				/>
				<div>
					<Button
						startContent={<AddIcon size={20} />}
						color="success"
						className="text-white"
						onClick={() => navigate("/dashboard/products/add")}
					>
						Qo'shish
					</Button>
				</div>
				<Button
					isIconOnly
					color="danger"
					className="text-white"
					isDisabled={selectedKeys.size === 0}
				>
					<DeleteIcon size={20} />
				</Button>
			</div>
		</div>
	);
};
