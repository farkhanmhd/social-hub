/**
 * test scenarios for profile slice
 *
 * should set desired profile to profile state correctly
 */

import { describe, it, expect } from "@jest/globals";
import profileSlice from "./slice";
import { User } from "../authUser/slice";

describe("profile slice", () => {
  it("should set desired profile to profile state correctly", () => {
    const state: User = {
      id: "",
      name: "",
      email: "",
      avatar: "",
    };

    const profileToBeSet: User = {
      id: "user-1",
      name: "test",
      email: "test",
      avatar: "https://ui-avatars.com/api/?name=test&background=random",
    };

    const action = {
      type: "profile/setProfile",
      payload: profileToBeSet,
    };

    const newState = profileSlice.reducer(state, action);
    expect(newState).toEqual(profileToBeSet);
  });
});
