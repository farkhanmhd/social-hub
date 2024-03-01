import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalStateInterface {
  postModal: boolean;
  commentModal: boolean;
}

const intialState: ModalStateInterface = {
  postModal: false,
  commentModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: intialState,
  reducers: {
    setPostModal: (
      state: ModalStateInterface,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      postModal: action.payload,
    }),
    setCommentModal: (
      state: ModalStateInterface,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      commentModal: action.payload,
    }),
  },
});

export const { setPostModal, setCommentModal } = modalSlice.actions;

export default modalSlice.reducer;
