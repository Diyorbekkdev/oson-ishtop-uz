import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
	selectedKeys: string[];
};

const initialState: InitialState = {
	selectedKeys: [],
};

const productModal = createSlice({
	name: "product-modal-slice",
	initialState,
	reducers: {
		setSelectedKeys(state, { payload }: { payload: string[] }) {
			state.selectedKeys = payload;
		},
	},
});

export default productModal.reducer;
export const { setSelectedKeys } = productModal.actions;
