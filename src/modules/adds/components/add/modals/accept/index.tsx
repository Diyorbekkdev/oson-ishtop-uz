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
				<ModalHeader
					className="flex flex-col gap-1"
					title="Foydalanuvchini E'lonini Tasdiqlash"
				>
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
						color="success"
						isLoading={isPending}
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
