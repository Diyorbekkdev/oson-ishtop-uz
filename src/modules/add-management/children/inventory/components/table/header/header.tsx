import { HistoryIcon } from "@/assets/icons/dashboard.icons";
import { RefreshIcon, SearchIcon } from "@/assets/icons/global/gloval.icons";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useInventoryModals } from "../../../routes/inventory.features";

type TInvTableHeader = {
	workers: number;
};

export const InvTableHeader = ({ workers }: TInvTableHeader) => {
	const items = [
		{
			key: "new",
			label: "New file",
		},
		{
			key: "copy",
			label: "Copy link",
		},
		{
			key: "edit",
			label: "Edit file",
		},
		{
			key: "delete",
			label: "Delete file",
		},
	];
	const { setModal } = useInventoryModals();
	return (
		<div className="flex items-center justify-between">
			<span className="flex flex-col text-2xl font-[600]">
				Inventarizatsiya{" "}
				<small className="text-xs text-[#8E9BA8]">{workers} ta ishchi</small>
			</span>
			<div className="flex items-center gap-4">
				<Select
					items={[
						{ key: "1", label: "Storage 1" },
						{ key: "2", label: "Storage 2" },
						{ key: "3", label: "Storage 3" },
					]}
					placeholder="Ombor tanlang"
					className="min-w-[160px]"
					radius="sm"
				>
					{(storage) => (
						<SelectItem key={storage.key}>{storage.label}</SelectItem>
					)}
				</Select>
				<DatePicker showMonthAndYearPickers radius="sm" />
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
						startContent={<RefreshIcon size={20} />}
						color="success"
						className="text-white min-w-[150px]"
						onPress={() => setModal({ InvModal: true })}
					>
						Sinxronlash
					</Button>
				</div>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Button color="warning" isIconOnly>
							<HistoryIcon />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions" items={items}>
						{(item) => (
							<DropdownItem
								key={item.key}
								color={item.key === "delete" ? "danger" : "default"}
								className={item.key === "delete" ? "text-danger" : ""}
							>
								{item.label}
							</DropdownItem>
						)}
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
};
