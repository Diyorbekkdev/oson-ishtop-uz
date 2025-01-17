import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { useUsersModals } from "@/modules/users/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { useFreezeUserTransactionFeatures } from "./features";

export const FreezeTransaction = () => {
	const {
		onFreeze: { mutateAsync, isPending },
		onRequestClose,
	} = useFreezeUserTransactionFeatures();
	const { freeze } = useUsersModals();

	return (
		<Modal isOpen={freeze?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					Foydalanuvchini balansini muzlatish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Foydalanuvchini balansni muzlatishni tasdiqlash uchun{" "}
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
							await mutateAsync(freeze?.props);
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
