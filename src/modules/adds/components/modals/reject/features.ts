import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useAddsModals } from "@/modules/adds/store";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ADDS_MANAGEMENT, ADD_STATUS_PARAMS, CONTENT } from "../../../model";

type RemoveUserFeatures = {
	onReject: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useRejectFeatures = (): RemoveUserFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal, reject } = useAddsModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(ADDS_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(ADDS_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onReject = useMutation<void, Error, CONTENT>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${ADD_STATUS_PARAMS?.REJECTED}/${reject?.props?.id}`,
				method: "POST",
				body: String(value?.info),
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
			reject: { open: false, props: null },
		});
	};
	return { onRequestClose, onReject };
};
