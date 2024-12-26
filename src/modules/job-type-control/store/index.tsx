import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import {
	TJobTypeControlModal,
	setGlobalModal,
} from "@/redux/generic-slices/modals";

export const useJobTypeControlModals = () => {
	const dispatch = useReduxDispatch();
	const { jobTypeControl } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TJobTypeControlModal>) =>
		dispatch(
			setGlobalModal({ jobTypeControl: { ...jobTypeControl, ...payload } }),
		);

	return {
		...jobTypeControl,
		setModal,
	};
};
