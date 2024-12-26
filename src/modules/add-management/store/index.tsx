import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import {
	TAddManagementModal,
	setGlobalModal,
} from "@/redux/generic-slices/modals";
import { TTab } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { ReduxInitialState, TABS } from "../model";

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

// STORE
const initialState: ReduxInitialState = {
	tabs: JSON.parse(localStorage.getItem(TABS.KEY) ?? "[]") as TTab[],
};

const addManagementSlice = createSlice({
	name: "add_management",
	initialState,
	reducers: {
		setTabs: (state, { payload }: { payload: ReduxInitialState["tabs"] }) => {
			state.tabs = payload;
		},
	},
});

export default addManagementSlice.reducer;
export const { setTabs } = addManagementSlice.actions;
