import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	JOB_CATEGORIES_MANAGEMENT,
	PARENT_FORM,
} from "@/modules/job-categories/model";
import { useJobCategoriesModals } from "@/modules/job-categories/store";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveParentFeatures = {
	onRemove: MutationResult<PARENT_FORM>;
	onRequestClose: () => void;
};

export const useRemoveParentFeatures = (): RemoveParentFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { remove, setModal } = useJobCategoriesModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const onRemove = useMutation<void, Error, PARENT_FORM>({
		mutationFn: async () => {
			const { error, data } = await functionInvoke<PARENT_FORM>({
				functionName: `${JOB_CATEGORIES_MANAGEMENT.REMOVE}/${remove?.props?.id}`,
				method: "DELETE",
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
					`${JOB_CATEGORIES_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}`,
				],
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
