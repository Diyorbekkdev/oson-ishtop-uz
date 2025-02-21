import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { useRegionsModals } from "@/modules/regions/store";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { useRemoveAreaFeatures } from "./features";

export const RemoveArea = () => {
	const {
		onRemove: { mutateAsync, isPending },
		onRequestClose,
	} = useRemoveAreaFeatures();
	const { areas_remove } = useRegionsModals();

	return (
		<Modal isOpen={areas_remove?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					Chegirmani o'chirish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Manzilni o'chirishni tasdiqlash uchun{" "}
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
							await mutateAsync(areas_remove?.props);
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
