import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { TAdds, setGlobalModal } from "@/redux/generic-slices/modals";

export const useAddsModals = () => {
	const dispatch = useReduxDispatch();
	const { adds } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TAdds>) =>
		dispatch(setGlobalModal({ adds: { ...adds, ...payload } }));

	return {
		...adds,
		setModal,
	};
};
