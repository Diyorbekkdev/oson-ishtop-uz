import { createSlice } from "@reduxjs/toolkit";

interface Sidenav {
	isFixed?: boolean;
	isExpanded: boolean;
}

type InitialState = {
	sidenav: Sidenav;
};

const isFixed =
	String(
		localStorage.getItem("sidenav(fixed)") ?? "false",
	).toLocaleLowerCase() === "true";

const initialState: InitialState = {
	sidenav: {
		isExpanded: isFixed,
		isFixed: isFixed,
	},
};

const ui = createSlice({
	name: "ui-slice",
	initialState,
	reducers: {
		setSideNav(state, { payload }: { payload: Sidenav }) {
			state.sidenav = payload;
		},
	},
});

export default ui.reducer;
export const { setSideNav } = ui.actions;
