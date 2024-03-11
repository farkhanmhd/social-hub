import threadSlice, { ThreadInterface, ThreadCommentsInterface } from "./slice";

/**
 * test scenarios for thread slice
 *
 * should return a new thread
 * should return a new comment
 * should push a new userId to upVotesBy
 * should push a new userId to comments upVotesBy
 * should filter remove a userId from upVotesBy and downVotesBy
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

  it("should push a new comment", () => {
    const state: ThreadInterface[] = [
      {
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
      },
    ];

    const authUser = {
      id: "user-7rD3YddCPGnpWpWO",
      name: "test",
      avatar: "https://ui-avatars.com/api/?name=test&background=random",
    };

    const newComment: ThreadCommentsInterface = {
      id: "",
      content: "test",
      createdAt: new Date().toISOString(),
      owner: {
        id: authUser.id,
        name: authUser.name,
        avatar: authUser.avatar,
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: "threads/updateThreadComments",
      payload: { id: state[0].id, comment: newComment.content, authUser },
    };

    const newState = threadSlice.reducer(state, action);
    expect(newState[0].comments).toEqual([newComment, ...state[0].comments]);
  });

  // it("should push a new userId to upVotesBy", () => {});
  // it("should push a new userId to comments upVotesBy", () => {});
  // it("should remove a userId from upVotesBy and downVotesBy", () => {});
});
