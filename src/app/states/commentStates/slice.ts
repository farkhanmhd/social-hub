import { createSlice } from "@reduxjs/toolkit";
import { ThreadInterface } from "../threads/slice";

const initialState: ThreadInterface = {
  id: "",
  title: "",
  body: "",
  category: "",
  createdAt: "",
  ownerId: "",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  ownerName: "",
  avatar: "",
  comments: [],
};

const commentModalStateSlice = createSlice({
  name: "commentModalState",
  initialState,
  reducers: {
    setCommentModalStates: (state, action) => action.payload,
  },
});

export const { setCommentModalStates } = commentModalStateSlice.actions;
export default commentModalStateSlice;
