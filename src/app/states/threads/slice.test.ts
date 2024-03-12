/**
 * test scenarios for thread slice
 *
 * should return a new thread
 * should return a new comment
 * should push a new userId to upVotesBy
 * should push a new userId to comments upVotesBy
 * should filter remove a userId from upVotesBy and downVotesBy
 */

import threadSlice, { ThreadInterface, ThreadCommentsInterface } from "./slice";

describe("thread slice", () => {
  it("should return a new thread", () => {
    const state: ThreadInterface[] = [];
    const newThread: ThreadInterface = {
      id: "thread-1",
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
        id: "thread-1",
        title: "test",
        body: "test",
        category: "test",
        createdAt: "",
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

    const newComment = {
      id: "",
      content: "test",
      createdAt: "",
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

  it("should push a new userId to upVotesBy", () => {
    const state: ThreadInterface[] = [
      {
        id: "thread-1",
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
    const action = {
      type: "threads/updateLikeThread",
      payload: { threadId: state[0].id, userId: authUser.id },
    };
    const newState = threadSlice.reducer(state, action);
    expect(newState[0].upVotesBy).toEqual([authUser.id, ...state[0].upVotesBy]);
  });

  it("should push a new userId to comments upVotesBy", () => {
    const state: ThreadInterface[] = [
      {
        id: "thread-1",
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
        comments: [
          {
            id: "comment-1",
            content: "test",
            createdAt: "" || new Date().toISOString(),
            owner: {
              id: "user-7rD3YddCPGnpWpWO",
              name: "test",
              avatar: "https://ui-avatars.com/api/?name=test&background=random",
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    ];

    const authUser = {
      id: "user-7rD3YddCPGnpWpWO",
      name: "test",
      avatar: "https://ui-avatars.com/api/?name=test&background=random",
    };

    const action = {
      type: "threads/updateCommentLike",
      payload: {
        threadId: state[0].id,
        commentId: state[0].comments[0].id,
        userId: authUser.id,
      },
    };

    const newState = threadSlice.reducer(state, action);
    expect(newState[0].comments[0].upVotesBy).toEqual([
      authUser.id,
      ...state[0].comments[0].upVotesBy,
    ]);
  });

  it("should remove a userId from upVotesBy and downVotesBy", () => {
    const state: ThreadInterface[] = [
      {
        id: "thread-1",
        title: "test",
        body: "test",
        category: "test",
        createdAt: new Date().toISOString(),
        ownerId: "user-1",
        upVotesBy: ["user-2"],
        downVotesBy: ["user-2"],
        totalComments: 0,
        ownerName: "user-1",
        avatar: "https://ui-avatars.com/api/?name=user&background=random",
        comments: [],
      },
    ];

    const action = {
      type: "threads/updateNeutralizeThreadLike",
      payload: { threadId: state[0].id, userId: "user-2" },
    };

    const newState = threadSlice.reducer(state, action);

    expect(newState[0].upVotesBy).toEqual([]);
    expect(newState[0].downVotesBy).toEqual([]);
  });
});
