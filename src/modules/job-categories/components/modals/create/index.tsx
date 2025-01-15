import { useSearchParams } from "@/hooks/useSearchParams";
import { PARENT_FORM } from "@/modules/job-categories/model";
import { parentSchema } from "@/modules/job-categories/model/validations";
import { useJobCategoriesModals } from "@/modules/job-categories/store";
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
import { useCreateParentCategoryFeatures } from "./feature";

export const Create = () => {
	const { create, setModal } = useJobCategoriesModals();
	const {
		onCreate: { mutateAsync, isPending },
	} = useCreateParentCategoryFeatures();
	const { clearParams } = useSearchParams();

	const form = useForm<PARENT_FORM, ZodValidator>({
		defaultValues: {
			nameUz: "",
			nameEn: "",
			nameRu: "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
			form.reset();
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: parentSchema,
		},
	});

	const onClose = () => {
		setModal({ create: { open: false, props: null } });
		form.reset();
		clearParams();
	};

	return (
		<Modal isOpen={create?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader
					className="flex flex-col gap-1"
					title=" Ish kategoriyasini qo'shish"
				>
					Ish kategoriyasini qo'shish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="nameUz">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Kategoriya nomi (UZ)"
										radius="sm"
										className="w-full"
										placeholder="Kategoriya nomini kiriting"
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
										label="Kategoriya nomi (EN)"
										radius="sm"
										className="w-full"
										placeholder="Enter name"
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
										label="Kategoriya nomi (RU)"
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
									Saqlash
								</Button>
							)}
						</form.Subscribe>
					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
