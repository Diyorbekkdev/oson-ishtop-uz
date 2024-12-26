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

type TTopContent = {
	workers: number;
	selectedKeys: Selection & { size?: number };
};

export const TopContent = ({ workers, selectedKeys }: TTopContent) => {
	console.log(selectedKeys);

	return (
		<div className="flex items-center justify-between">
			<span className="flex flex-col text-2xl font-[600]">
				Ishchilar{" "}
				<small className="text-xs text-[#8E9BA8]">{workers} ta ishchi</small>
			</span>
			<div className="flex items-center gap-4">
				<Select
					items={[
						{ key: "1", label: "group 1" },
						{ key: "2", label: "group 2" },
						{ key: "3", label: "group 3" },
					]}
					placeholder="Guruh tanlang"
					aria-label="Guruh tanlang"
					className="min-w-[160px]"
					radius="sm"
				>
					{(group) => <SelectItem key={group.key}>{group.label}</SelectItem>}
				</Select>
				<DateRangePicker
					showMonthAndYearPickers
					aria-label="Sanani tanlang"
					radius="sm"
				/>
				<Input
					type="email"
					placeholder="Izlash"
					aria-label="Izlash"
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
						className="text-white "
						aria-label="Qo'shish"
					>
						Qo'shish
					</Button>
				</div>
				<Button
					isIconOnly
					color="danger"
					className="text-white"
					isDisabled={selectedKeys.size === 0}
					aria-label="O'chirish"
				>
					<DeleteIcon size={20} />
				</Button>
			</div>
		</div>
	);
};
