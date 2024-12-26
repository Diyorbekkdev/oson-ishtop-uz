import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { TRegionsModal, setGlobalModal } from "@/redux/generic-slices/modals";

export const useRegionsModals = () => {
	const dispatch = useReduxDispatch();
	const { regions } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TRegionsModal>) =>
		dispatch(setGlobalModal({ regions: { ...regions, ...payload } }));

	return {
		...regions,
		setModal,
	};
};
