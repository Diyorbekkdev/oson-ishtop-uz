import { useSearchParams } from "@/hooks/useSearchParams";
import { USER_FORM } from "@/modules/users/model";
import { useUsersModals } from "@/modules/users/store";
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
import { useUpdateFeatures } from "./features";

export const Update = () => {
	const { update, setModal } = useUsersModals();
	const {
		onUpdate: { mutateAsync, isPending },
	} = useUpdateFeatures();
	const { clearParams } = useSearchParams();

	const form = useForm<USER_FORM, ZodValidator>({
		defaultValues: {
			fio: update?.props?.fio ?? "",
			birthDate: update?.props?.birthDate ?? "",
			gender: update?.props?.gender ?? "",
			avatarResourcesId: update?.props?.avatarResourcesId ?? "",
		},
		onSubmit: async (values) => {
			await mutateAsync(values?.value);
		},
		validatorAdapter: standardSchemaValidator(),
	});

	const onClose = () => {
		setModal({ update: { open: false, props: null } });
		form.reset();
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
						<form.Field name="fio">
							{({ state, handleChange }) => (
								<div>
									<Input
										label="Foydalanuvchi ismi"
										radius="sm"
										className="w-full"
										placeholder="Foydalanuvchi ismini kiriting"
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
