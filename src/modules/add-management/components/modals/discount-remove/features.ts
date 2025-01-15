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

type RemoveAddFeatures = {
	onRemove: MutationResult<DISCOUNT_FORM>;
	onRequestClose: () => void;
};

export const useRemoveAddFeatures = (): RemoveAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { discount_remove, setModal } = useAddManagementModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADD_MANAGEMENT.PAGE) || 1;
	const onRequestClose = () => {
		setModal({
			discount_remove: { open: false, props: null },
		});
	};
	const onRemove = useMutation<void, Error, DISCOUNT_FORM>({
		mutationFn: async () => {
			const { error } = await functionInvoke<DISCOUNT_FORM>({
				functionName: `${DISCOUNT.REMOVE}/${discount_remove?.props?.id}`,
				method: "DELETE",
			});

			if (error) return error;

			toast.success("Chegirma o'chirildi");

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

	return { onRemove, onRequestClose };
};
