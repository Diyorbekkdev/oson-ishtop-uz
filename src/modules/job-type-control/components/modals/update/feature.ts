import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	JOB_TYPE_CONTROL,
	JOB_TYPE_CONTROL_FORM,
	JOB_TYPE_CONTROL_UPDATE_MODAL,
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

type TCreateAddFeatures = {
	onUpdate: MutationResult<JOB_TYPE_CONTROL_FORM>;
	onRequestClose: () => void;
};

export const useCreateAddFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { update, setModal } = useJobTypeControlModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_TYPE_CONTROL.PAGE_SIZE) || 10;
	const page = getParams(JOB_TYPE_CONTROL.PAGE) || 1;

	const onUpdate = useMutation<void, Error, JOB_TYPE_CONTROL_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<JOB_TYPE_CONTROL_FORM>({
				functionName: `${JOB_TYPE_CONTROL_UPDATE_MODAL.PARAM}/${update?.props?.id}`,
				method: "PUT",
				body: { ...value },
			});

			if (error) return error;

			toast.success(
				formatNotification(
					JOB_TYPE_CONTROL_SUCCESS_MESSAGES[
						JOB_TYPE_CONTROL_SUCCESS_CODES.UPDATED
					],
					{
						name: value?.nameUz,
					},
				).title,
			);
			setModal({
				update: { open: false, props: null },
			});
			queryClient.refetchQueries({
				queryKey: [`${JOB_TYPE_CONTROL.DATA_KEY}?10=${pageSize}&page=${page}`],
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
