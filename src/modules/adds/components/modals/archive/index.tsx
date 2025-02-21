import { useAddsModals } from "@/modules/adds/store";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { useArchiveFeatures } from "./features";

export const ArchiveAdd = () => {
	const {
		onArchive: { mutateAsync, isPending },
		onRequestClose,
	} = useArchiveFeatures();
	const { archive } = useAddsModals();

	return (
		<Modal isOpen={archive?.open} onClose={onRequestClose} size="xl">
			<ModalContent>
				<ModalHeader
					className="flex flex-col gap-1"
					title="Foydalanuvchini E'lonini Arxivlas"
				>
					Foydalanuvchini E'lonini Arxivlash
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<p>
						Foydalanuvchi e'lonini arxivlash uchun{" "}
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
							await mutateAsync(archive.props);
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
