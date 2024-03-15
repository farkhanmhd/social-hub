/**
 * Testing scenario for Header
 *
 * - Should render Logo correctly
 * - Should render NavHeader correctly
 * - Should render Dropdown button correctly
 */

import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import Header from "./Header";
import store from "../../states/index";

describe("Header component", () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render Logo correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("Should render NavHeader correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const navHeader = screen.getByTestId("nav-header");
    expect(navHeader).toBeInTheDocument();
  });

  it("Should render Dropdown button correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const dropdownBtn = screen.getByTestId("dropdown");
    expect(dropdownBtn).toBeInTheDocument();
  });
});
