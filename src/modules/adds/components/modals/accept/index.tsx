import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { useAddsModals } from "@/modules/adds/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { useAcceptFeatures } from "./features";

export const AcceptAdd = () => {
	const {
		onAccept: { mutateAsync, isPending },
		onRequestClose,
	} = useAcceptFeatures();
	const { accept } = useAddsModals();

	return (
		<Modal isOpen={accept?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					Foydalanuvchini E'lonini Tasdiqlash
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Foydalanuvchi e'lonini tasdiqlash uchun{" "}
						<span className="font-bold">"Tasdiqlash"</span> tugmasini bosing.
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
							await mutateAsync(accept.props);
						}}
						className="text-white"
					>
						Tasdiqlash
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
