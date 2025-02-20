import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { ADD_STATUS_PARAMS, CONTENT } from "@/modules/adds/model";
import { useSelectedAddCache } from "@/modules/adds/services";
import { useAddsModals } from "@/modules/adds/store";
import { MutationResult } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveUserFeatures = {
	onReject: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useRejectFeatures = (): RemoveUserFeatures => {
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useAddsModals();

	const {
		data: { refetch },
	} = useSelectedAddCache();
	const { getParams } = useSearchParams();

	const onReject = useMutation<void, Error, CONTENT>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${ADD_STATUS_PARAMS?.REJECTED}/${getParams("add_id")}`,
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
			await refetch();
		},
	});

	const onRequestClose = () => {
		setModal({
			reject: { open: false, props: null },
		});
	};
	return { onRequestClose, onReject };
};
