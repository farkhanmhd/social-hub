/**
 * Testing scenario for Register Page
 *
 * - Should handle name typing correctly
 * - Should handle email typing correctly
 * - Should handle password typing correctly
 * - should call onRegister function when Register button is clicked
 */

import React from "react";
import RegisterPage from "./page";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../states/index";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => {
      return {
        push: () => {},
      };
    },
  };
});

expect.extend(matchers);

describe("RegisterPage component", () => {
  afterEach(() => {
    cleanup();
  });

  it("Should handle name typing correctly", async () => {
    // Arrange
    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>,
    );
    const nameInput = await screen.getByPlaceholderText("John Doe");

    // Action
    await userEvent.type(nameInput, "testing");

    // Assert
    expect(nameInput).toHaveValue("testing");
  });
  it("Should handle email typing correctly", () => {});
  it("Should handle password typing correctly", () => {});
  it("Should call onRegister function when Register button is clicked", () => {});
});
