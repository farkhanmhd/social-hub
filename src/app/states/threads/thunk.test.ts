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
import { error } from "console";

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
    api.createThread = jest.fn().mockImplementation(() => Promise.resolve(fakeNewThread));

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddThread(fakeThreadResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, addNewThread(fakeThreadResponse));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoading());
  });

  it("Should dispatch actions correctly when data fetch failed", async () => {
    // arrange
    // stub implementation
    const errorMessage = "Network Error";
    api.createThread = jest.fn().mockRejectedValue(errorMessage);

    // mock dispatch
    const dispatch = jest.fn();

    // act & assert
    await expect(asyncAddThread(fakeThreadResponse)(dispatch)).rejects.toThrow(
      `Failed to add thread: ${errorMessage}`,
    );
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, addNewThread(fakeThreadResponse));
    expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoading());
  });
});
