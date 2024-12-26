// import productModal from "@/modules/dashboard/children/products/modal/store";
import { configureStore } from "@reduxjs/toolkit";
import modal from "./generic-slices/modals";
import signIn from "./slices/auth/sign-in";
import ui from "./slices/ui";

const store = configureStore({
	reducer: {
		signIn,
		ui,
		modal,
	},
});

export default store;
export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
