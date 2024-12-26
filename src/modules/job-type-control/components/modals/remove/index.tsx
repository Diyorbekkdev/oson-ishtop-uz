import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { useJobTypeControlModals } from "@/modules/job-type-control/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { useRemoveJobTypeFeatures } from "./features";

export const Remove = () => {
	const {
		onRemove: { mutateAsync, isPending },
		onRequestClose,
	} = useRemoveJobTypeFeatures();
	const { remove } = useJobTypeControlModals();

	return (
		<Modal isOpen={remove?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					O'chirish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Elementni o'chirishni tasdiqlash uchun{" "}
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
							await mutateAsync(remove?.props);
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
