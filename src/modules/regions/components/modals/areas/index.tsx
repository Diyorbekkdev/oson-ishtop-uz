import { AREAS_FORM } from "@/modules/regions/model";
import { areaSchema } from "@/modules/regions/model/validations";
import { useRegionsModals } from "@/modules/regions/store";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/modal";
import { standardSchemaValidator, useForm } from "@tanstack/react-form";
import { ZodValidator } from "@tanstack/zod-form-adapter";
import { useAreasModalFeatures } from "./features";

export const AreasModal = () => {
	const { areas, setModal } = useRegionsModals();
	const {
		handleSubmit: { mutateAsync, isPending },
	} = useAreasModalFeatures();

	const form = useForm<AREAS_FORM, ZodValidator>({
		defaultValues: {
			nameUz: areas?.props?.nameUz ?? "",
			nameEn: areas?.props?.nameEn ?? "",
			nameRu: areas?.props?.nameRu ?? "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: areaSchema,
		},
	});

	const onClose = () => {
		setModal({ areas: { open: false, props: null } });
	};

	return (
		<Modal isOpen={areas?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader
					className="flex flex-col gap-1"
					title={areas?.props?.id ? "Manzilni Tahrirlash" : "Manzil qo'shish"}
				>
					{areas?.props?.id ? "Manzilni Tahrirlash" : "Manzil qo'shish"}
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="nameUz">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Manzil nomi (UZ)"
										radius="sm"
										className="w-full"
										placeholder="Manzil nomini kiriting"
										value={state.value}
										onChange={(e) => handleChange(e.target.value)}
										isInvalid={!!state.meta.errors[0]}
										errorMessage={state.meta.errors}
									/>
								</div>
							)}
						</form.Field>

						{/* Name EN Field */}
						<form.Field name="nameEn">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Manzil nomi (EN)"
										radius="sm"
										className="w-full"
										placeholder="Enter area name"
										value={state.value}
										onChange={(e) => handleChange(e.target.value)}
										isInvalid={!!state.meta.errors[0]}
										errorMessage={state.meta.errors}
									/>
								</div>
							)}
						</form.Field>

						{/* Name RU Field */}
						<form.Field name="nameRu">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Manzil nomi (RU)"
										radius="sm"
										className="w-full"
										placeholder="Введите название"
										value={state.value}
										onChange={(e) => handleChange(e.target.value)}
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
									{areas?.props?.id ? "Saqlash" : "Yaratish"}
								</Button>
							)}
						</form.Subscribe>
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
