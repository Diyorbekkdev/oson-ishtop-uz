import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { REJECT_FORM } from "@/modules/adds/model";
import { useAddsModals } from "@/modules/adds/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Textarea } from "@nextui-org/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { standardSchemaValidator, useForm } from "@tanstack/react-form";
import { ZodValidator } from "@tanstack/zod-form-adapter";
import { useRejectFeatures } from "./features";

export const RejectAdd = () => {
	const {
		onReject: { mutateAsync, isPending },
		onRequestClose,
	} = useRejectFeatures();
	const { reject, setModal } = useAddsModals();

	const form = useForm<REJECT_FORM, ZodValidator>({
		defaultValues: {
			description: "",
		},
		onSubmit: async (values) => {
			await mutateAsync({ ...reject.props, info: values?.value.description });
			form.reset();
		},
		validatorAdapter: standardSchemaValidator(),
	});

	return (
		<Modal
			isOpen={reject?.open}
			onClose={() => {
				onRequestClose();
				form.reset();
				setModal({
					reject: { open: false, props: null },
				});
			}}
			size="xl"
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="Ombor qo'shish">
					Foydalanuvchini E'lonini rad etish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<form.Field name="description">
						{({ state, handleChange }) => (
							<Textarea
								label="E'lonni nima uchun rad etmoqchisiz"
								placeholder="Qisqacha tafsilot"
								value={state.value}
								onChange={(e) => handleChange(e.target.value)}
							/>
						)}
					</form.Field>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" variant="light" onPress={onRequestClose}>
						Bekor qilish
					</Button>
					<form.Subscribe>
						{({ values }) => (
							<Button
								color="danger"
								isLoading={isPending}
								endContent={<DeleteIcon size={20} />}
								onPress={form.handleSubmit}
								className="text-white"
								isDisabled={!values?.description}
							>
								Tasdiqlash
							</Button>
						)}
					</form.Subscribe>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
