import { useHttpRequest } from "@/hooks/useHttpRequest";
import { ADD_STATUS_PARAMS, CONTENT } from "@/modules/adds/model";
import { useSelectedAddCache } from "@/modules/adds/services";
import { useAddsModals } from "@/modules/adds/store";
import { MutationResult } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type AcceptFeatures = {
	onAccept: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useAcceptFeatures = (): AcceptFeatures => {
	const { functionInvoke } = useHttpRequest();
	const { setModal, accept } = useAddsModals();

	const {
		data: { refetch },
	} = useSelectedAddCache();

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
			await refetch();
		},
	});

	const onRequestClose = () => {
		setModal({
			accept: { open: false, props: null },
		});
	};
	return { onRequestClose, onAccept };
};
