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

type TCreateAddFeatures = {
	onCreate: MutationResult<PARENT_FORM>;
	onRequestClose: () => void;
};

export const useCreateParentCategoryFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useJobCategoriesModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const onCreate = useMutation<void, Error, PARENT_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<PARENT_FORM>({
				functionName: JOB_CATEGORIES_MANAGEMENT.CREATE,
				body: { ...value },
			});

			if (error) return error;

			toast.success("Ish kategoriyasi yaratildi.");

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
			create: { open: false, props: null },
		});
	};

	return {
		onCreate,
		onRequestClose,
	};
};
