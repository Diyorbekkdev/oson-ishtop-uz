import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TAddManagementModal = {
	create: { open: boolean; props: any };
	update: { open: boolean; props: any };
	remove: { open: boolean; props: any };
	discount: { open: boolean; props: any };
	discount_remove: { open: boolean; props: any };
};

export type TRegionsModal = {
	create: { open: boolean; props: any };
	update: { open: boolean; props: any };
	remove: { open: boolean; props: any };
	areas: { open: boolean; props: any };
	areas_remove: { open: boolean; props: any };
};

export type TJobTypeControlModal = {
	create: { open: boolean; props: any };
	update: { open: boolean; props: any };
	remove: { open: boolean; props: any };
};

export type TJobCategoriesModal = {
	create: { open: boolean; props: any };
	update: { open: boolean; props: any };
	remove: { open: boolean; props: any };
	child: { open: boolean; props: any };
	child_remove: { open: boolean; props: any };
};

export type TUserProfileSettingsModal = {
	user_profile: { open: boolean; props: any };
};

export type TUsers = {
	remove: { open: boolean; props: any };
	update: { open: boolean; props: any };
	freeze: { open: boolean; props: any };
};

type Modal = {
	addManagement: TAddManagementModal;
	regions: TRegionsModal;
	jobTypeControl: TJobTypeControlModal;
	jobCategoryControl: TJobCategoriesModal;
	userProfileControl: TUserProfileSettingsModal;
	users: TUsers;
};

const initialState: Modal = {
	addManagement: {
		create: { open: false, props: null },
		update: { open: false, props: null },
		remove: { open: false, props: null },
		discount: { open: false, props: null },
		discount_remove: { open: false, props: null },
	},
	regions: {
		create: { open: false, props: null },
		update: { open: false, props: null },
		remove: { open: false, props: null },
		areas: { open: false, props: null },
		areas_remove: { open: false, props: null },
	},
	jobTypeControl: {
		create: { open: false, props: null },
		update: { open: false, props: null },
		remove: { open: false, props: null },
	},
	jobCategoryControl: {
		create: { open: false, props: null },
		update: { open: false, props: null },
		remove: { open: false, props: null },
		child: { open: false, props: null },
		child_remove: { open: false, props: null },
	},
	userProfileControl: {
		user_profile: { open: false, props: null },
	},
	users: {
		remove: { open: false, props: null },
		update: { open: false, props: null },
		freeze: { open: false, props: null },
	},
};

const modal = createSlice({
	name: "modalSlice",
	initialState,
	reducers: {
		// setGlobalModal: <T extends keyof IModal>(
		// 	state: IModal,
		// 	action: PayloadAction<{ key: T; value: IModal[T] }>,
		// ) => {
		// 	state[action.payload.key] = action.payload.value;
		// },
		setGlobalModal: (state, action: PayloadAction<Partial<Modal>>) => {
			return { ...state, ...action.payload };
		},
	},
});

export default modal.reducer;
export const { setGlobalModal } = modal.actions;
