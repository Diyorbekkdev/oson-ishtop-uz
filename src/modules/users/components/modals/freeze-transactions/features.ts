import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
	CONTENT,
	USER_FREEZE_TRANSACTION_MODAL,
	USER_MANAGEMENT,
} from "../../../model";
import { useUsersModals } from "../../../store";

type RemoveUserFeatures = {
	onFreeze: MutationResult<any>;
	unFreeze: MutationResult<any>;
	onRequestClose: () => void;
};

export const useFreezeUserTransactionFeatures = (): RemoveUserFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { setModal } = useUsersModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onFreeze = useMutation<void, Error, CONTENT>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${USER_FREEZE_TRANSACTION_MODAL?.FREEZE}/${value?.id}`,
				method: "POST",
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
					`${USER_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&search=${search}`,
				],
			});
		},
	});

	const unFreeze = useMutation<void, Error, CONTENT>({
		mutationFn: async (value) => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${USER_FREEZE_TRANSACTION_MODAL?.UNFREEZE}/${value?.id}`,
				method: "POST",
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
					`${USER_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}&search=${search}`,
				],
			});
		},
	});

	const onRequestClose = () => {
		setModal({
			freeze: { open: false, props: null },
		});
	};
	return { onFreeze, onRequestClose, unFreeze };
};
