/**
 * test scenarios for authUser slice
 *
 * should set Authed User to authUser state
 */

import { describe, it, expect } from "@jest/globals";
import authUserSlice, { User } from "./slice";

describe("authUser slice", () => {
  it("should set Authed User to authUser state", () => {
    const state: User = {
      id: "",
      name: "",
      email: "",
      avatar: "",
    };

    const userToBeSet: User = {
      id: "user-1",
      name: "test",
      email: "test",
      avatar: "https://ui-avatars.com/api/?name=test&background=random",
    };

    const action = {
      type: "authUser/setAuthUser",
      payload: userToBeSet,
    };

    const newState = authUserSlice.reducer(state, action);

    expect(newState).toEqual(userToBeSet);
  });
});
