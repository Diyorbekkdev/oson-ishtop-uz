import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CONTENT, USER_MANAGEMENT, USER_REMOVE_MODAL } from "../../../model";
import { useUsersModals } from "../../../store";

type RemoveUserFeatures = {
	onRemove: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useRemoveUserFeatures = (): RemoveUserFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { remove, setModal } = useUsersModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onRemove = useMutation<void, Error, CONTENT>({
		mutationFn: async () => {
			const { error } = await functionInvoke<CONTENT>({
				functionName: `${USER_REMOVE_MODAL.PARAM}/${remove?.props?.id}`,
				method: "DELETE",
			});

			if (error) return error;

			toast.success("Foydalanuvchi o'chirildi");

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
			remove: { open: false, props: null },
		});
	};
	return { onRemove, onRequestClose };
};
