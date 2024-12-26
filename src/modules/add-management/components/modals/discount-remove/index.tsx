import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { useAddManagementModals } from "@/modules/add-management/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { useRemoveAddFeatures } from "./features";

export const RemoveDiscount = () => {
	const {
		onRemove: { mutateAsync, isPending },
		onRequestClose,
	} = useRemoveAddFeatures();
	const { discount_remove } = useAddManagementModals();

	return (
		<Modal isOpen={discount_remove?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					Chegirmani o'chirish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Chegirmani o'chirishni tasdiqlash uchun{" "}
						<span className="font-bold">"O'chirish"</span> tugmasini bosing.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" variant="light" onPress={onRequestClose}>
						Bekor qilish
					</Button>
					<Button
						color="danger"
						isLoading={isPending}
						endContent={<DeleteIcon size={20} />}
						onPress={async () => {
							await mutateAsync(discount_remove?.props);
						}}
						className="text-white"
					>
						O'chirish
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
