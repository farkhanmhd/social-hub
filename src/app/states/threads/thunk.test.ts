/**
 * Test scenario
 *
 * - asyncAddTrhead Thunk
 *  - Should dispatch actions correctly when data fetched successfully
 *  - Should dispatch actions correctly when data fetch failed
 */

import { asyncAddThread, asyncSetThread } from "./thunk";
import { addNewThread, ThreadInterface } from "./slice";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../api/api";

const fakeThreadResponse: ThreadInterface = {
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

const fakeNewThread = {
  title: fakeThreadResponse.title,
  body: fakeThreadResponse.body,
  category: fakeThreadResponse.category,
};

describe("asyncAddThread thunk", () => {
  it("Should dispatch actions correctly when data fetched successfully", async () => {
    // arrange
    // stub implementation
    api.createThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(fakeNewThread));

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddThread(fakeThreadResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addNewThread(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(asyncSetThread());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
