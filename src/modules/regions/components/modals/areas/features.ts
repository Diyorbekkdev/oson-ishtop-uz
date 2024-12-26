import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { ADD_MANAGEMENT } from "@/modules/add-management/model";

import { AREAS, AREAS_FORM, PARAMS } from "@/modules/regions/model";
import { useRegionsModals } from "@/modules/regions/store";

import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TCreateAddFeatures = {
	handleSubmit: MutationResult<AREAS_FORM>;
	onRequestClose: () => void;
};

export const useAreasModalFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { areas, setModal } = useRegionsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADD_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADD_MANAGEMENT.PAGE) || 1;

	const functionName = areas?.props?.id
		? `${AREAS.UPDATE}/${areas?.props?.id}`
		: AREAS.CREATE;

	const handleSubmit = useMutation<void, Error, AREAS_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<AREAS_FORM>({
				functionName,
				method: areas?.props?.id ? "POST" : "POST",
				body: {
					...value,
					regionsId: Number(getParams(PARAMS.REGION_ID)),
				},
			});

			if (error) return error;

			toast.success(
				areas?.props?.id ? "Manzil Tahrirlandi" : "Manzil qo'shildi",
			);

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
			areas: { open: false, props: null },
		});
	};

	return {
		handleSubmit,
		onRequestClose,
	};
};
