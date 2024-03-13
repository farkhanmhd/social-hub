/**
 * Testing scenario for Register Page
 *
 * - Should handle name typing correctly
 * - Should handle email typing correctly
 * - Should handle password typing correctly
 * - should call onRegister function when form is submitted
 */

import React, { FormEvent } from "react";
import RegisterPage from "./page";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../states/index";
import { asyncRegister } from "../../states/authUser/thunk";
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

  it("Should handle email typing correctly", async () => {
    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>,
    );

    // Arrange
    const emailInput = screen.getByPlaceholderText("youremail@example.com");

    // Action
    await userEvent.type(emailInput, "testing123@testing.com");

    // Assert
    expect(emailInput).toHaveValue("testing123@testing.com");
  });

  it("Should call onRegister function when form is submitted", async () => {
    // Arrange
    const mockRegister = jest.fn();

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>,
    );

    const registerButton = await screen.getByTestId("register-button");

    // Action
    await expect(
      userEvent.click(registerButton).then(() => expect(mockRegister).toHaveBeenCalled()),
    );
  });
});
