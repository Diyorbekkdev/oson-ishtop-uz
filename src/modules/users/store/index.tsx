import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { TUsers, setGlobalModal } from "@/redux/generic-slices/modals";

export const useUsersModals = () => {
	const dispatch = useReduxDispatch();
	const { users } = useReduxSelector(({ modal }) => modal);

	const setModal = (payload: Partial<TUsers>) =>
		dispatch(setGlobalModal({ users: { ...users, ...payload } }));

	return {
		...users,
		setModal,
	};
};
