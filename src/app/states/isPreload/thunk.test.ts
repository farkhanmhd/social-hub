/**
 * Test Scneario
 *
 * - asyncPreloadProcess Thunk
 *  - Should dispatch actions correctly when data fetched successfully
 *  - Should dispatch actions correctly when data fetch failed
 */

import { hideLoading, showLoading } from "react-redux-loading-bar";
import asyncPreloadProcess from "./thunk";
import api from "../../api/api";
import { setAuthUser } from "../authUser/slice";
import { setIsPreload } from "./slice";

const fakeAuthUser = {
  id: "user-1",
  name: "test",
  avatar: "https://ui-avatars.com/api/?name=test&background=random",
};

describe("asyncPreloadProcess thunk", () => {
  it("Should dispatch actions correctly when data fetched successfully", async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = jest.fn().mockImplementation(() => Promise.resolve(fakeAuthUser));

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUser(fakeAuthUser));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsPreload(false));
    expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(5, hideLoading());
  });

  it("Should dispatch actions correctly when data fetch failed", async () => {
    // arrange
    // stub implementation
    const errorMessage = "Network Error";
    api.getOwnProfile = jest.fn().mockRejectedValue(errorMessage);

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);
    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUser(null));
    expect(dispatch).toHaveBeenNthCalledWith(3, setIsPreload(false));
    expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
    expect(dispatch).toHaveBeenNthCalledWith(5, hideLoading());
  });
});
