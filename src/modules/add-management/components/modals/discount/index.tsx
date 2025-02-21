import { DISCOUNT_FORM } from "@/modules/add-management/model";
import { discountSchema } from "@/modules/add-management/model/validations";
import { useAddManagementModals } from "@/modules/add-management/store";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { standardSchemaValidator, useForm } from "@tanstack/react-form";
import { ZodValidator } from "@tanstack/zod-form-adapter";
import { useDiscountModalFeatures } from "./features";

export const DiscountModal = () => {
	const { discount, setModal } = useAddManagementModals();
	const {
		handleSubmit: { mutateAsync, isPending },
	} = useDiscountModalFeatures();

	const form = useForm<DISCOUNT_FORM, ZodValidator>({
		defaultValues: {
			fixedDay: discount?.props?.fixedDay ?? "",
			discount: discount?.props?.discount ?? "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
			form.reset();
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: discountSchema,
		},
	});

	const onClose = () => {
		setModal({ discount: { open: false, props: null } });
		form.reset();
	};

	return (
		<Modal isOpen={discount?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader
					className="flex flex-col gap-1"
					title={
						discount?.props?.id ? "Chegirmani Tahrirlash" : "Chegirma qo'shish"
					}
				>
					{discount?.props?.id ? "Chegirmani Tahrirlash" : "Chegirma qo'shish"}
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="fixedDay">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Chegirma biriktiriladigan kunlar"
										radius="sm"
										className="w-full"
										placeholder="Chegirma biriktiriladigan kunlar"
										type="number"
										value={String(state.value)}
										onChange={(e) => handleChange(Number(e.target.value))}
										isInvalid={!!state.meta.errors[0]}
										errorMessage={state.meta.errors}
									/>
								</div>
							)}
						</form.Field>

						{/* Name EN Field */}
						<form.Field name="discount">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Chegirma miqdori"
										radius="sm"
										className="w-full"
										placeholder="Chegirma miqdori"
										type="number"
										value={state.value.toString()}
										onChange={(e) => handleChange(+e.target.value)}
										isInvalid={!!state.meta.errors[0]}
										errorMessage={state.meta.errors}
									/>
								</div>
							)}
						</form.Field>
					</div>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Bekor qilish
						</Button>
						<form.Subscribe>
							{({ canSubmit }) => (
								<Button
									color="success"
									isLoading={isPending}
									type="submit"
									className="text-white"
									isDisabled={isPending || !canSubmit}
									onPress={form.handleSubmit}
								>
									{discount?.props?.id ? "Saqlash" : "Yaratish"}
								</Button>
							)}
						</form.Subscribe>
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
