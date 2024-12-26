import { TStatus } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type SignIn = {
	rememberMe: boolean;
	auth: {
		status?: TStatus;
		phone?: string;
		username?: string;
	};
};

const initialState: SignIn = {
	auth: {
		status: "initial",
		phone: "",
		username: "",
	},
	rememberMe: Boolean(localStorage.getItem("rememberMe")),
};

const signIn = createSlice({
	name: "signInSlice",
	initialState,
	reducers: {
		setAuth(state, { payload }: { payload: SignIn["auth"] }) {
			state.auth = payload;
		},
		setRememberMe(state) {
			state.rememberMe = !state.rememberMe;
		},
	},
});

export default signIn.reducer;
export const { setAuth, setRememberMe } = signIn.actions;
