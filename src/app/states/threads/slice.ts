import { createSlice } from "@reduxjs/toolkit";

export interface ThreadInterface {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: number[];
  downVotesBy: number[];
  totalComments: number;
  ownerName: string;
  ownerProfilePicture: string;
}

const initialState: ThreadInterface[] = [];

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => action.payload,
  },
});

export const { setThreads } = threadSlice.actions;

export default threadSlice.reducer;
