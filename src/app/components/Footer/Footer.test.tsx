/**
 * Testing scenario for Footer
 *
 * - Should render Footer correctly
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import Footer from "./Footer";

describe("Footer component", () => {
  it("Should render Footer correctly", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });
});
