import { useJobCategoriesModals } from "@/modules/job-categories/store";
import { AREAS_FORM } from "@/modules/regions/model";
import { areaSchema } from "@/modules/regions/model/validations";
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
import { useChildModalFeatures } from "./features";

export const ChildModal = () => {
	const { child, setModal } = useJobCategoriesModals();
	const {
		handleSubmit: { mutateAsync, isPending },
	} = useChildModalFeatures();

	const form = useForm<AREAS_FORM, ZodValidator>({
		defaultValues: {
			nameUz: child?.props?.nameUz ?? "",
			nameEn: child?.props?.nameEn ?? "",
			nameRu: child?.props?.nameRu ?? "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
			form.reset();
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: areaSchema,
		},
	});

	const onClose = () => {
		setModal({ child: { open: false, props: null } });
		form.reset();
	};

	return (
		<Modal isOpen={child?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader
					className="flex flex-col gap-1"
					title={
						child?.props?.id
							? "Ish Kategoriyasini Tahrirlash"
							: "Ish Kategoriyasini qo'shish"
					}
				>
					{child?.props?.id
						? "Ish Kategoriyasini Tahrirlash"
						: "Ish Kategoriyasini qo'shish"}
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="nameUz">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Ish Kategoriyasi nomi (UZ)"
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
										label="Ish Kategoriyasi nomi (EN)"
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
										label="Ish Kategoriyasi nomi (RU)"
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
									{child?.props?.id ? "Saqlash" : "Yaratish"}
								</Button>
							)}
						</form.Subscribe>
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
