import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { useInventoryModals } from "../../routes/inventory.features";

export const InvModal = () => {
	const { setModal, InvModal } = useInventoryModals();
	const { setParams, clearParams } = useSearchParams();
	const [values, setValues] = useState({});
	const onClose = () => {
		setModal({ InvModal: false });
		clearParams();
	};

	const onChanges = (name: string, value: string) => {
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const onVerify = () => {
		localStorage.setItem("inventory", JSON.stringify(values));
		setParams({ inventory_mode: "on" });
		setModal({ InvModal: false });
	};

	return (
		<>
			<Modal isOpen={InvModal} onClose={onClose} size="xl">
				<ModalContent>
					<ModalHeader
						className="flex flex-col gap-1"
						title="Ushbu ma’lumotlar asosida sinxronlashtirish"
					>
						Ushbu ma’lumotlar asosida sinxronlashtirish
					</ModalHeader>
					<Divider className="w-full" />
					<ModalBody className="pt-6">
						<Select
							items={[
								{ key: "1", label: "Storage 1" },
								{ key: "2", label: "Storage 2" },
								{ key: "3", label: "Storage 3" },
							]}
							placeholder="Ombor tanlang"
							label="Ombor"
							aria-label="Ombor"
							name="storage"
							labelPlacement="outside"
							className="w-full"
							radius="sm"
							onChange={(e) => onChanges(e.target.name, e.target.value)}
						>
							{(storage) => (
								<SelectItem key={storage.key}>{storage.label}</SelectItem>
							)}
						</Select>
						<DatePicker
							showMonthAndYearPickers
							radius="sm"
							className="w-full"
							label="Vaqt"
							aria-label="Vaqt"
							labelPlacement="outside"
							name="date"
						/>
						<Input
							type="text"
							placeholder="Tartib raqami"
							radius="sm"
							className="w-full"
							label="Tartib raqami"
							aria-label="tartib raqami"
							labelPlacement="outside"
							name="orderNumber"
							onChange={(e) => onChanges(e.target.name, e.target.value)}
						/>
						<Input
							type="text"
							placeholder="Tavsif"
							radius="sm"
							className="w-full"
							label="Tavsif"
							aria-label="tavsif"
							labelPlacement="outside"
							name="description"
							onChange={(e) => onChanges(e.target.name, e.target.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Bekor qilish
						</Button>
						<Button
							color="success"
							onPress={onVerify}
							className="text-white"
							isDisabled={Object.values(values).length < 4}
						>
							Tasdiqlash
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
