import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TAddManagementModal = {
  create: { open: boolean; props: any };
  update: { open: boolean; props: any };
  remove: { open: boolean; props: any };
};

type Modal = {
  addManagement: TAddManagementModal;
};

const initialState: Modal = {
  addManagement: {
    create: { open: false, props: null },
    update: { open: false, props: null },
    remove: { open: false, props: null },
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
