import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
	USER_FORM,
	USER_MANAGEMENT,
	USER_UPDATE_MODAL,
} from "@/modules/users/model";
import { useUsersModals } from "@/modules/users/store";

import { MutationResult } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TUserUpdateFeatures = {
	onUpdate: MutationResult<USER_FORM>;
	onRequestClose: () => void;
};

export const useUpdateFeatures = (): TUserUpdateFeatures => {
	const queryClient = useQueryClient();
	const { functionInvoke } = useHttpRequest();
	const { update, setModal } = useUsersModals();

	const { getParams } = useSearchParams();

	const pageSize = getParams(USER_MANAGEMENT.PAGE_SIZE) || 10;
	const page = getParams(USER_MANAGEMENT.PAGE) || 1;
	const search = getParams("search") || "";

	const onRequestClose = () => {
		setModal({
			update: { open: false, props: null },
		});
	};

	const onUpdate = useMutation<void, Error, USER_FORM>({
		mutationFn: async (value) => {
			const { error } = await functionInvoke<USER_FORM>({
				functionName: `${USER_UPDATE_MODAL.PARAM}/${update?.props?.id}/update`,
				method: "PUT",
				body: { ...value },
			});

			if (error) return error;

			toast.success("Foydalanuvchi tahrirlandi");
			onRequestClose();
			queryClient.refetchQueries({
				queryKey: [
					`${USER_MANAGEMENT.DATA_KEY}?size=${pageSize}&page=${page}$search=${search}`,
				],
			});
		},
	});

	return {
		onUpdate,
		onRequestClose,
	};
};
