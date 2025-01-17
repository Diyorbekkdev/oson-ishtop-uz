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
	onFreeze: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useFreezeUserTransactionFeatures = (): RemoveUserFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { freeze, setModal } = useUsersModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onFreeze = useMutation<void, Error, CONTENT>({
		mutationFn: async () => {
			const { error } = await functionInvoke<CONTENT>({
				functionName: `${USER_FREEZE_TRANSACTION_MODAL.PARAM}/${freeze?.props?.id}`,
				method: "POST",
			});

			if (error) return error;

			toast.success("Foydalanuvchi hisobi muzlatildi");

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
	return { onFreeze, onRequestClose };
};
