import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	ADD_MANAGEMENT,
	ADD_MANAGEMENT_CREATE_MODAL,
	ADD_MANAGEMENT_FORM,
} from "@/modules/add-management/model";
import {
	ADD_SUCCESS_CODES,
	ADD_SUCCESS_MESSAGES,
} from "@/modules/add-management/model/notifications";
import { useAddManagementModals } from "@/modules/add-management/store";

import { MutationResult } from "@/types";
import { formatNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TCreateAddFeatures = {
	onCreate: MutationResult<ADD_MANAGEMENT_FORM>;
	onRequestClose: () => void;
};

export const useCreateAddFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useAddManagementModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

	const onRequestClose = () => {
		setModal({
			create: { open: false, props: null },
		});
	};

	const onCreate = useMutation<void, Error, ADD_MANAGEMENT_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<ADD_MANAGEMENT_FORM>({
				functionName: ADD_MANAGEMENT_CREATE_MODAL.PARAM,
				body: { ...value },
			});

			if (error) return error;

			toast.success(
				formatNotification(ADD_SUCCESS_MESSAGES[ADD_SUCCESS_CODES.CREATED], {
					name: value?.nameUz,
				}).title,
			);

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [`${ADD_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
			});
		},
	});

	return {
		onCreate,
		onRequestClose,
	};
};
