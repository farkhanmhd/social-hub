/**
 * Test Scneario
 *
 * - asyncAllUsers Thunk
 *  - Should dispatch action correctly when data fetched successfully
 */

import { describe, it, expect } from "@jest/globals";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import asyncAllUsers from "./thunk";
import api from "../../api/api";
import { setAllUsers } from "./slice";

describe("asyncAllUsers thunk", () => {
  it("Should dispatch action correctly when data fetched successfully", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = jest.fn().mockImplementation(() => Promise.resolve());
    const users = await api.getAllUsers();

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAllUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setAllUsers(users));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });
});
