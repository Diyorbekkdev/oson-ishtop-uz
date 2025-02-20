import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useAdminAdds } from "@/modules/adds/services";
import { useAddsModals } from "@/modules/adds/store";
import { MutationResult } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ADD_STATUS_PARAMS, CONTENT } from "../../../model";

type ArchiveFeatures = {
	onArchive: MutationResult<CONTENT>;
	onRequestClose: () => void;
};

export const useArchiveFeatures = (): ArchiveFeatures => {
	const { functionInvoke } = useHttpRequest();
	const { setModal, archive } = useAddsModals();

	const {
		data: { refetch },
	} = useAdminAdds();
	const {
		data: { refetch: adds_list_refetch },
	} = useAdminAdds();

	const onArchive = useMutation<void, Error, CONTENT>({
		mutationFn: async () => {
			const { error, data } = await functionInvoke<CONTENT>({
				functionName: `${ADD_STATUS_PARAMS?.ARCHIVE}/${archive?.props?.id}`,
				method: "POST",
			});

			if (error) return error;

			if (data?.success) {
				toast.success(data?.message);
			} else {
				toast.error(data?.message);
			}

			onRequestClose();
			await refetch();
			await adds_list_refetch();
		},
	});

	const onRequestClose = () => {
		setModal({
			archive: { open: false, props: null },
		});
	};
	return { onRequestClose, onArchive };
};
