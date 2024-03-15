/**
 * Test Scneario
 *
 * - asyncSetProfile Thunk
 *  - Should dispatch actions correctly when data fetched successfully
 */

import { describe, it, expect } from "@jest/globals";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import asyncSetProfile from "./thunk";
import api from "../../api/api";
import { setProfile } from "./slice";
import { User } from "../authUser/slice";

const fakeUserId = {
  id: "user-1",
};

describe("asyncSetProfile thunk", () => {
  it("Should dispatch action correctly", async () => {
    // arrange
    // stub implementation
    const { id } = fakeUserId;
    api.getSingleUser = jest.fn().mockImplementation(() => Promise.resolve(id));
    const profile: User = await api.getSingleUser({ id });

    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncSetProfile(id)(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setProfile(profile));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });
});
