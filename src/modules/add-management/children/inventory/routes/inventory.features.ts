import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { TInventory, setGlobalModal } from "@/redux/generic-slices/modals";

export const useInventoryFeatures = () => {
	return {};
};

export const useInventoryModals = () => {
	const dispatch = useReduxDispatch();
	const { inventory } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TInventory>) =>
		dispatch(setGlobalModal({ inventory: { ...inventory, ...payload } }));

	return {
		...inventory,
		setModal,
	};
};
