import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	JOB_TYPE_CONTROL,
	JOB_TYPE_CONTROL_FORM,
	JOB_TYPE_CONTROL_REMOVE_MODAL,
} from "@/modules/job-type-control/model";
import {
	JOB_TYPE_CONTROL_SUCCESS_CODES,
	JOB_TYPE_CONTROL_SUCCESS_MESSAGES,
} from "@/modules/job-type-control/model/notifications";
import { useJobTypeControlModals } from "@/modules/job-type-control/store";
import { MutationResult } from "@/types";
import { formatNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveJobTypeFeatures = {
	onRemove: MutationResult<JOB_TYPE_CONTROL_FORM>;
	onRequestClose: () => void;
};

export const useRemoveJobTypeFeatures = (): RemoveJobTypeFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { remove, setModal } = useJobTypeControlModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_TYPE_CONTROL.PAGE_SIZE) || 10;
	const page = getParams(JOB_TYPE_CONTROL.PAGE) || 1;

	const onRemove = useMutation<void, Error, JOB_TYPE_CONTROL_FORM>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<JOB_TYPE_CONTROL_FORM>({
				functionName: `${JOB_TYPE_CONTROL_REMOVE_MODAL.PARAM}/${remove?.props?.id}`,
				method: "DELETE",
			});

			if (error) return error;

			if (data?.success) {
				toast.success(
					formatNotification(
						JOB_TYPE_CONTROL_SUCCESS_MESSAGES[
							JOB_TYPE_CONTROL_SUCCESS_CODES.REMOVED
						],
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
				queryKey: [`${JOB_TYPE_CONTROL.DATA_KEY}?10=${pageSize}&page=${page}`],
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
