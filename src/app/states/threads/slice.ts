import { createSlice } from "@reduxjs/toolkit";

export interface ThreadInterface {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
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
    addNewThread: (state, action) => [action.payload, ...state],
    updateLikeThread: (state, action) => {
      const { threadId, userId } = action.payload;

      const threadToUpdate = state.find((thread) => thread.id === threadId);

      if (threadToUpdate) {
        if (!threadToUpdate.upVotesBy.includes(userId)) {
          threadToUpdate.upVotesBy.push(userId);
          threadToUpdate.downVotesBy = threadToUpdate.downVotesBy.filter(
            (id) => id !== userId,
          );
        } else {
          threadToUpdate.upVotesBy = threadToUpdate.upVotesBy.filter(
            (id) => id !== userId,
          );
        }
      }
    },
    updateDislikeThread: (state, action) => {
      const { threadId, userId } = action.payload;

      const threadToUpdate = state.find((thread) => thread.id === threadId);

      if (threadToUpdate) {
        if (!threadToUpdate.downVotesBy.includes(userId)) {
          threadToUpdate.downVotesBy.push(userId);
          threadToUpdate.upVotesBy = threadToUpdate.upVotesBy.filter(
            (id) => id !== userId,
          );
        } else {
          threadToUpdate.downVotesBy = threadToUpdate.downVotesBy.filter(
            (id) => id !== userId,
          );
        }
      }
    },
  },
});

export const {
  setThreads,
  addNewThread,
  updateLikeThread,
  updateDislikeThread,
} = threadSlice.actions;

export default threadSlice.reducer;
