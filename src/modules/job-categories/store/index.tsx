import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import {
	TJobCategoriesModal,
	setGlobalModal,
} from "@/redux/generic-slices/modals";

export const useJobCategoriesModals = () => {
	const dispatch = useReduxDispatch();
	const { jobCategoryControl } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TJobCategoriesModal>) =>
		dispatch(
			setGlobalModal({
				jobCategoryControl: { ...jobCategoryControl, ...payload },
			}),
		);

	return {
		...jobCategoryControl,
		setModal,
	};
};
