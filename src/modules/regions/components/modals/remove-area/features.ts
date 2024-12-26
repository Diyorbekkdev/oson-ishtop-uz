import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { ADD_MANAGEMENT } from "@/modules/add-management/model";

import { AREAS, AREAS_FORM, PARAMS } from "@/modules/regions/model";
import { useRegionsModals } from "@/modules/regions/store";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveAreaFeatures = {
	onRemove: MutationResult<AREAS_FORM>;
	onRequestClose: () => void;
};

export const useRemoveAreaFeatures = (): RemoveAreaFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { areas_remove, setModal } = useRegionsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

	const onRemove = useMutation<void, Error, AREAS_FORM>({
		mutationFn: async () => {
			const { error } = await functionInvoke<AREAS_FORM>({
				functionName: `${AREAS.REMOVE}/${areas_remove?.props?.id}`,
				method: "GET",
			});

			if (error) return error;

			toast.success("Manzil o'chirildi");

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [
					`${AREAS.DATA_KEY}?10=${pageSize}&page=${page}&regionsId=${getParams(
						PARAMS.REGION_ID,
					)}`,
				],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			areas_remove: { open: false, props: null },
		});
	};
	return { onRemove, onRequestClose };
};
