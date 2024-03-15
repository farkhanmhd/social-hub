/**
 * test scenarios for isPreload slice
 *  - should set isPreload correctly
 */

import { describe, it, expect } from "@jest/globals";
import isPreloadSlice from "./slice";

describe("isPreload slice", () => {
  it("should set isPreload correctly", () => {
    const state: boolean = false;

    const desiredState: boolean = true;

    const action = {
      type: "isPreload/setIsPreload",
      payload: desiredState,
    };

    const newState = isPreloadSlice.reducer(state, action);
    expect(newState).toEqual(desiredState);
  });
});
