import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	REGIONS_UPDATE_MODAL,
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
	onUpdate: MutationResult<REGION_FORM>;
	onRequestClose: () => void;
};

export const useCreateAddFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { update, setModal } = useRegionsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(REGION_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(REGION_MANAGEMENT.PAGE) || 1;

	const onUpdate = useMutation<void, Error, REGION_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<REGION_FORM>({
				functionName: `${REGIONS_UPDATE_MODAL.PARAM}/${update?.props?.id}`,
				method: "PUT",
				body: { ...value },
			});

			if (error) return error;

			toast.success(
				formatNotification(
					REGION_SUCCESS_MESSAGES[REGION_SUCCESS_CODES.UPDATED],
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

	const onRequestClose = () => {
		setModal({
			update: { open: false, props: null },
		});
	};

	return {
		onUpdate,
		onRequestClose,
	};
};
