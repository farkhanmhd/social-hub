/**
 * Testing scenario for Modal
 *
 * - Should render Modal correctly
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import Modal from "./Modal";

describe("Modal component", () => {
  it("Should render Modal correctly", () => {
    render(<Modal title="Title" message="Message" />);
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
});
