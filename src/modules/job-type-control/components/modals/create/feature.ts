import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	JOB_TYPE_CONTROL,
	JOB_TYPE_CONTROL_CREATE_MODAL,
	JOB_TYPE_CONTROL_FORM,
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

type TCreateJobTypeFeatures = {
	onCreate: MutationResult<JOB_TYPE_CONTROL_FORM>;
	onRequestClose: () => void;
};

export const useCreateJobTypeFeatures = (): TCreateJobTypeFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useJobTypeControlModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_TYPE_CONTROL.PAGE_SIZE) || 10;
	const page = getParams(JOB_TYPE_CONTROL.PAGE) || 1;

	const onCreate = useMutation<void, Error, JOB_TYPE_CONTROL_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<JOB_TYPE_CONTROL_FORM>({
				functionName: JOB_TYPE_CONTROL_CREATE_MODAL.PARAM,
				body: { ...value },
			});

			if (error) return error;

			toast.success(
				formatNotification(
					JOB_TYPE_CONTROL_SUCCESS_MESSAGES[
						JOB_TYPE_CONTROL_SUCCESS_CODES.CREATED
					],
					{
						name: value?.nameUz,
					},
				).title,
			);

			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [`${JOB_TYPE_CONTROL.DATA_KEY}?10=${pageSize}&page=${page}`],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			create: { open: false, props: null },
		});
	};

	return {
		onCreate,
		onRequestClose,
	};
};
