import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useAddsModals } from "@/modules/adds/store";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ADDS_MANAGEMENT, ADD_STATUS_PARAMS, CONTENT } from "../../../model";

type AcceptFeatures = {
	onAccept: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useAcceptFeatures = (): AcceptFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal, accept } = useAddsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADDS_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADDS_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onAccept = useMutation<void, Error, CONTENT>({
		mutationFn: async () => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${ADD_STATUS_PARAMS?.ACCEPTED}/${accept?.props?.id}`,
				method: "POST",
			});

			if (error) return error;

			if (data?.success) {
				toast.success(data?.message);
			} else {
				toast.error(data?.message);
			}

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [
					`${ADDS_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&search=${search}`,
				],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			accept: { open: false, props: null },
		});
	};
	return { onRequestClose, onAccept };
};
