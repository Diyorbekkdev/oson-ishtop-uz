import ControlError from "@/components/error-message";
import { ADD_MANAGEMENT_FORM } from "@/modules/add-management/model";
import { createAddsSchema } from "@/modules/add-management/model/validations";
import { useAddManagementModals } from "@/modules/add-management/store";
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
import { useFormik } from "formik";
import { useCreateAddFeatures } from "./feature";

export const Create = () => {
	const { create, setModal } = useAddManagementModals();
	const {
		onCreate: { mutateAsync, isPending },
	} = useCreateAddFeatures();

	const form = useFormik<ADD_MANAGEMENT_FORM>({
		initialValues: {
			nameUz: "",
			nameEn: "",
			nameRu: "",
			pricePerDay: 0,
		},
		onSubmit: async (values) => {
			await mutateAsync(values);
			form.resetForm();
		},
		validationSchema: createAddsSchema,
	});

	const onClose = () => {
		setModal({ create: { open: false, props: null } });
		form.resetForm();
	};

	return (
		<Modal isOpen={create?.open} onClose={onClose} size="xl">
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1" title="E'lon qo'shish">
					E'lon qo'shish
				</ModalHeader>
				<Divider className="w-full" />
				<ModalBody className="pt-6">
					<form onSubmit={form.handleSubmit}>
						<div className="flex flex-col gap-4">
							<div>
								<Input
									label="E'lon nomi (UZ)"
									radius="sm"
									className="w-full"
									placeholder="E'lon nomini kiriting"
									name="nameUz"
									value={form.values.nameUz}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									isInvalid={form.touched.nameUz && !!form.errors.nameUz}
									required
									isClearable
									onClear={() => {
										form.setFieldValue("nameUz", "");
									}}
								/>
								<ControlError
									form={form}
									field={form.getFieldProps("nameUz")}
								/>
							</div>
							<div>
								<Input
									label="E'lon nomi (EN)"
									radius="sm"
									className="w-full"
									placeholder="Enter add name"
									name="nameEn"
									value={form.values.nameEn}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									isInvalid={form.touched.nameEn && !!form.errors.nameEn}
									required
									isClearable
									onClear={() => {
										form.setFieldValue("nameEn", "");
									}}
								/>
								<ControlError
									form={form}
									field={form.getFieldProps("nameEn")}
								/>
							</div>
							<div>
								<Input
									label="E'lon nomi (RU)"
									radius="sm"
									className="w-full"
									placeholder="Введите название"
									name="nameRu"
									value={form.values.nameRu}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									isInvalid={form.touched.nameRu && !!form.errors.nameRu}
									required
									isClearable
									onClear={() => {
										form.setFieldValue("nameRu", "");
									}}
								/>
								<ControlError
									form={form}
									field={form.getFieldProps("nameRu")}
								/>
							</div>
							<div>
								<Input
									label="Narx (Kunlik)"
									radius="sm"
									className="w-full"
									placeholder="Kunlik narxni kiriting"
									name="pricePerDay"
									type="number"
									value={form?.values?.pricePerDay.toString()}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									isInvalid={
										form.touched.pricePerDay && !!form.errors.pricePerDay
									}
								/>
								<ControlError
									form={form}
									field={form.getFieldProps("pricePerDay")}
								/>
							</div>
						</div>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Bekor qilish
							</Button>
							<Button
								color="success"
								isLoading={form.isSubmitting || isPending}
								type="submit"
								className="text-white"
								isDisabled={!form.dirty || form.isSubmitting}
							>
								Qo'shish
							</Button>
						</ModalFooter>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
