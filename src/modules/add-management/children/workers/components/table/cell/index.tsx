import {
	DeleteIcon,
	EditIcon,
	EyeSlash,
	MoreIcon,
} from "@/assets/icons/global/gloval.icons";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";

type TRenderCell = {
	worker_id: string;
	cashbox_id: string;
	pin: string;
	img: string;
	status: number;
	worker_username: string;
	worker_pass: string;
	joined_at: string;
	worker: string;
};

const items = [
	{
		key: "edit",
		label: "Edit file",
		icon: <EditIcon />,
		color: "text-[#022F5E]",
	},
	{
		key: "delete",
		label: "Delete file",
		icon: <DeleteIcon color="#EB2022" />,
		color: "text-danger",
	},
];

export const renderCell = (user: TRenderCell, columnKey: string | number) => {
	const cellValue = user[columnKey as keyof TRenderCell];
	switch (columnKey) {
		case "worker_id":
			return (
				<span className={`flex items-center gap-3`}>
					<small
						className={`h-8 w-[3px] text-transparent rounded-tr-[3px] rounded-br-[3px] -ml-2 ${user?.status === 1 ? "bg-[lime]" : user?.status === 2 ? "bg-[#D72323]" : "bg-[#596066]"}`}
					>
						.
					</small>{" "}
					{cellValue}
				</span>
			);
		case "worker":
			return (
				<User
					avatarProps={{ radius: "lg", src: user.img }}
					description={user.joined_at}
					name={cellValue}
				>
					{user.worker}
				</User>
			);
		case "pin":
			return (
				<div className="relative flex items-center gap-2">
					******
					<Tooltip content="Details" aria-label="Details" color="foreground">
						<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
							<EyeSlash size={20} />
						</span>
					</Tooltip>
				</div>
			);
		case "action":
			return (
				<Dropdown placement="bottom-end" aria-label="nn">
					<DropdownTrigger>
						<Button
							isIconOnly
							className="text-white bg-[#022F5E]"
							aria-label="More"
						>
							<MoreIcon />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions" items={items}>
						{(item) => (
							<DropdownItem
								key={item.key}
								className={item.color}
								startContent={item.icon}
								aria-label="Dynamic Actions"
							>
								{item.label}
							</DropdownItem>
						)}
					</DropdownMenu>
				</Dropdown>
			);
		default:
			return cellValue;
	}
};
