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

type TCreateAddFeatures = {
	handleSubmit: MutationResult<CHILD_FORM>;
	onRequestClose: () => void;
};

export const useChildModalFeatures = (): TCreateAddFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { child, setModal } = useJobCategoriesModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(JOB_CATEGORIES_MANAGEMENT.PAGE) || 1;

	const functionName = child?.props?.id
		? `${CHILD_CATEGORIES_MANAGEMENT.UPDATE}/${child?.props?.id}`
		: CHILD_CATEGORIES_MANAGEMENT.CREATE;

	const handleSubmit = useMutation<void, Error, CHILD_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<CHILD_FORM>({
				functionName,
				method: child?.props?.id ? "PUT" : "POST",
				body: {
					...value,
					parentId: Number(getParams(PARAMS.CATEGORY_ID)),
				},
			});

			if (error) return error;

			toast.success(
				child?.props?.id
					? "Ish kategoriyasi tahrirlandi"
					: "Ish kategoriasi qo'shildi",
			);

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
			child: { open: false, props: null },
		});
	};

	return {
		handleSubmit,
		onRequestClose,
	};
};
