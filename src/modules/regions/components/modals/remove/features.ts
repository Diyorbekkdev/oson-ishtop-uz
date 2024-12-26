import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	REGIONS_REMOVE_MODAL,
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

type RemoveAddFeatures = {
	onRemove: MutationResult<REGION_FORM>;
	onRequestClose: () => void;
};

export const useRemoveAddFeatures = (): RemoveAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { remove, setModal } = useRegionsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(REGION_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(REGION_MANAGEMENT.PAGE) || 1;

	const onRemove = useMutation<void, Error, REGION_FORM>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<REGION_FORM>({
				functionName: `${REGIONS_REMOVE_MODAL.PARAM}/${remove?.props?.id}`,
				method: "DELETE",
			});

			if (error) return error;

			if (data?.success) {
				toast.success(
					formatNotification(
						REGION_SUCCESS_MESSAGES[REGION_SUCCESS_CODES.REMOVED],
						{
							name: value?.nameUz,
						},
					).title,
				);
			} else {
				toast.error(data?.message);
			}

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [`${REGION_MANAGEMENT.DATA_KEY}?10=${pageSize}&page=${page}`],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			remove: { open: false, props: null },
		});
	};
	return { onRemove, onRequestClose };
};
