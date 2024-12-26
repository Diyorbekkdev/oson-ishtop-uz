import { useSearchParams } from "@/hooks/useSearchParams";
import { REGION_FORM } from "@/modules/regions/model";
import { regionSchema } from "@/modules/regions/model/validations";
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
import { useCreateAddFeatures } from "./feature";

export const Update = () => {
	const { update, setModal } = useRegionsModals();
	const {
		onUpdate: { mutateAsync, isPending },
	} = useCreateAddFeatures();
	const { clearParams } = useSearchParams();

	const form = useForm<REGION_FORM, ZodValidator>({
		defaultValues: {
			nameUz: update?.props?.nameUz ?? "",
			nameEn: update?.props?.nameEn ?? "",
			nameRu: update?.props?.nameRu ?? "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
		},
		validatorAdapter: standardSchemaValidator(),
		validators: {
			onChange: regionSchema,
		},
	});

	const onClose = () => {
		setModal({ update: { open: false, props: null } });
		clearParams();
	};

	return (
		<Modal isOpen={update?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="E'lonni tahrirlash">
					E'lonni tahrirlash
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<div className="flex flex-col gap-4">
						{/* Name UZ Field */}
						<form.Field name="nameUz">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="E'lon nomi (UZ)"
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
										label="E'lon nomi (EN)"
										radius="sm"
										className="w-full"
										placeholder="Enter add name"
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
										label="E'lon nomi (RU)"
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
