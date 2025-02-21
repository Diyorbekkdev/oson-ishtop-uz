import { useSearchParams } from "@/hooks/useSearchParams";
import { JOB_TYPE_CONTROL_FORM } from "@/modules/job-type-control/model";
import { jobTypeControlSchema } from "@/modules/job-type-control/model/validations";
import { useJobTypeControlModals } from "@/modules/job-type-control/store";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
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
import { useCreateJobTypeFeatures } from "./feature";

export const Create = () => {
	const { create, setModal } = useJobTypeControlModals();
	const {
		onCreate: { mutateAsync, isPending },
	} = useCreateJobTypeFeatures();
	const { clearParams } = useSearchParams();

	const form = useForm<JOB_TYPE_CONTROL_FORM, ZodValidator>({
		defaultValues: {
			nameUz: "",
			nameEn: "",
			nameRu: "",
			isThereTrialPeriod: false,
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: jobTypeControlSchema,
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
				<ModalHeader className="flex flex-col gap-1" title="Ish turi qo'shish">
					Ish turi qo'shish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="nameUz">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Ish nomi (UZ)"
										radius="sm"
										className="w-full"
										placeholder="E'lon nomini kiriting"
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
										label="Ish nomi (EN)"
										radius="sm"
										className="w-full"
										placeholder="Enter job name"
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
										label="Ish nomi (RU)"
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

						{/* Trial Period Field */}
						<form.Field name="isThereTrialPeriod">
							{({ state, handleChange }) => (
								<div className="flex items-center gap-2">
									<Checkbox
										isSelected={state.value}
										color="success"
										onChange={(e) => handleChange(e.target.checked)}
									>
										Sinov Davri
									</Checkbox>
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
