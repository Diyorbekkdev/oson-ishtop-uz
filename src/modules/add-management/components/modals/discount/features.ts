import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	ADD_MANAGEMENT,
	DISCOUNT,
	DISCOUNT_FORM,
	PARAMS,
} from "@/modules/add-management/model";

import { useAddManagementModals } from "@/modules/add-management/store";

import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TCreateAddFeatures = {
	handleSubmit: MutationResult<DISCOUNT_FORM>;
	onRequestClose: () => void;
};

export const useDiscountModalFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { discount, setModal } = useAddManagementModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

	const functionName = discount?.props?.id
		? `${DISCOUNT.UPDATE}/${discount?.props?.id}`
		: DISCOUNT.CREATE;

	const onRequestClose = () => {
		setModal({
			discount: { open: false, props: null },
		});
	};
	const handleSubmit = useMutation<void, Error, DISCOUNT_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<DISCOUNT_FORM>({
				functionName,
				method: discount?.props?.id ? "PUT" : "POST",
				body: {
					...value,
					annTypesId: getParams(PARAMS.ADD_TYPE_ID),
				},
			});

			if (error) return error;

			toast.success(
				discount?.props?.id ? "Chegirma Tahrirlandi" : "Chegirma Belgilandi",
			);

			onRequestClose();

			queryClient.refetchQueries({
				queryKey: [
					`${
						DISCOUNT.DATA_KEY
					}?10=${pageSize}&page=${page}&annTypesId=${getParams(
						PARAMS.ADD_TYPE_ID,
					)}`,
				],
			});
		},
	});

	return {
		handleSubmit,
		onRequestClose,
	};
};
