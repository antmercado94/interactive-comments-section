import { createSlice } from "@reduxjs/toolkit";

type Modal = {
  openModal: boolean;
  postId: number | null;
};

const initialState: Modal = { openModal: false, postId: null };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(
      _,
      action: {
        payload: { openModal: boolean; postId?: number | null };
        type: string;
      },
    ) {
      const { openModal, postId } = action.payload;
      return { openModal, postId: openModal ? postId ?? null : null };
    },
  },
});

// export selector
export const selectModal = (state: { modal: Modal }) => state.modal;

// export action creators
export const { toggleModal } = modalSlice.actions;

// export reducer
export default modalSlice.reducer;
