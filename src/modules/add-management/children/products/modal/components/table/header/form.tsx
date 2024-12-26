import { Card } from "@nextui-org/card";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

export const ModalFormContent = () => {
	return (
		<Card
			className="col-span-2 flex items-center flex-row gap-3 p-4"
			shadow="none"
			radius="none"
		>
			<Input
				type="text"
				placeholder="Nomi"
				radius="sm"
				label="Nomi"
				labelPlacement="outside"
				name="name"
				className="max-w-[200px]"
			/>
			<Select
				items={[
					{ key: "1", label: "Kategoriya 1" },
					{ key: "2", label: "Kategoriya 2" },
					{ key: "3", label: "Kategoriya 3" },
				]}
				placeholder="Kategoriya tanlang"
				label="Kategoriya"
				aria-label="Kategoriya"
				name="category"
				labelPlacement="outside"
				radius="sm"
				className="max-w-[200px]"
			>
				{(category) => (
					<SelectItem key={category.key}>{category.label}</SelectItem>
				)}
			</Select>
			<Input
				type="text"
				placeholder="Narxi"
				name="price"
				radius="sm"
				label="Narxi"
				labelPlacement="outside"
				className="max-w-[200px]"
			/>
			<DatePicker
				name="date"
				radius="sm"
				label="Sana"
				labelPlacement="outside"
				className="max-w-[200px]"
			/>
			<Input
				type="text"
				name="describtion"
				placeholder="Tavsif"
				radius="sm"
				label="Tavsif"
				labelPlacement="outside"
				className="max-w-[200px]"
			/>
		</Card>
	);
};
