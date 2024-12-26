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

type TCreateParentCategoriesFeatures = {
	onUpdate: MutationResult<PARENT_FORM>;
	onRequestClose: () => void;
};

export const useUpdateParentFeatures = (): TCreateParentCategoriesFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { update, setModal } = useJobCategoriesModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const onUpdate = useMutation<void, Error, PARENT_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<PARENT_FORM>({
				functionName: `${JOB_CATEGORIES_MANAGEMENT.UPDATE}/${update?.props?.id}`,
				method: "PUT",
				body: { ...value },
			});

			if (error) return error;

			toast.success("Kategoriya tahrirlandi");
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
			update: { open: false, props: null },
		});
	};

	return {
		onUpdate,
		onRequestClose,
	};
};
