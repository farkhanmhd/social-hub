import threadSlice, { ThreadInterface } from "./slice";

/**
 * test scenarios for thread slice
 *
 * should return a new thread
 * should return a new comment
 * should push a new userId to upVotesBy
 * should push a new userId to comments upVotesBy
 */

describe("thread slice", () => {
  it("should return a new thread", () => {
    const state: ThreadInterface[] = [];
    const newThread: ThreadInterface = {
      id: "1",
      title: "test",
      body: "test",
      category: "test",
      createdAt: new Date().toISOString(),
      ownerId: "user-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      ownerName: "user-1",
      avatar: "https://ui-avatars.com/api/?name=user&background=random",
      comments: [],
    };

    const action = {
      type: "threads/addNewThread",
      payload: newThread,
    };

    const newState = threadSlice.reducer(state, action);

    expect(newState).toEqual([newThread, ...state]);
  });
  it("should return a new comment", () => {});
  it("should push a new userId to upVotesBy", () => {});
  it("should push a new userId to comments upVotesBy", () => {});
});
