import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	REGIONS_CREATE_MODAL,
	REGION_FORM,
	REGION_MANAGEMENT,
} from "@/modules/regions/model";
import {
	REGION_SUCCESS_CODES,
	REGION_SUCCESS_MESSAGES,
} from "@/modules/regions/model/notifications";
import { useRegionsModals } from "@/modules/regions/store";

import { MutationResult } from "@/types";
import { formatNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TCreateAddFeatures = {
	onCreate: MutationResult<REGION_FORM>;
	onRequestClose: () => void;
};

export const useCreateAddFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useRegionsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(REGION_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(REGION_MANAGEMENT.PAGE) || 1;
	const onRequestClose = () => {
		setModal({
			create: { open: false, props: null },
		});
	};
	const onCreate = useMutation<void, Error, REGION_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<REGION_FORM>({
				functionName: REGIONS_CREATE_MODAL.PARAM,
				body: { ...value },
			});

			if (error) return error;

			toast.success(
				formatNotification(
					REGION_SUCCESS_MESSAGES[REGION_SUCCESS_CODES.CREATED],
					{
						name: value?.nameUz,
					},
				).title,
			);

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [`${REGION_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
			});
		},
	});

	return {
		onCreate,
		onRequestClose,
	};
};
