import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import {
	TAddManagementModal,
	setGlobalModal,
} from "@/redux/generic-slices/modals";

export const useAddManagementModals = () => {
	const dispatch = useReduxDispatch();
	const { addManagement } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TAddManagementModal>) =>
		dispatch(
			setGlobalModal({ addManagement: { ...addManagement, ...payload } }),
		);

	return {
		...addManagement,
		setModal,
	};
};
