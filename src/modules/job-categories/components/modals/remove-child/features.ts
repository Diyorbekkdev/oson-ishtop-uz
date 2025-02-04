import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	CHILD_CATEGORIES_MANAGEMENT,
	CHILD_FORM,
	JOB_CATEGORIES_MANAGEMENT,
	PARAMS,
} from "@/modules/job-categories/model";
import { useJobCategoriesModals } from "@/modules/job-categories/store";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type RemoveChildFeatures = {
	onRemove: MutationResult<CHILD_FORM>;
	onRequestClose: () => void;
};

export const useRemoveChildCategoryFeatures = (): RemoveChildFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { child_remove, setModal } = useJobCategoriesModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const onRemove = useMutation<void, Error, CHILD_FORM>({
		mutationFn: async () => {
			const { error, data } = await functionInvoke<CHILD_FORM>({
				functionName: `${CHILD_CATEGORIES_MANAGEMENT.REMOVE}/${child_remove?.props?.id}`,
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
					`${
						CHILD_CATEGORIES_MANAGEMENT.DATA_KEY
					}?size=${pageSize}&page=${page}&parentId=${getParams(
						PARAMS.CATEGORY_ID,
					)}`,
				],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			child_remove: { open: false, props: null },
		});
	};
	return { onRemove, onRequestClose };
};
