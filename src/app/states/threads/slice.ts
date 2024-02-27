import { createSlice } from "@reduxjs/toolkit";

interface Thread {
  id: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: number;
  upVotesBy: number[];
  downVotesBy: number[];
  totalComments: number;
}

interface ThreadsState {
  threads: Thread[];
}

const initialState: ThreadsState = {
  threads: [],
};

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    setThreads: (state, action) => action.payload,
  },
});

export const { setThreads } = threadSlice.actions;

export default threadSlice.reducer;
