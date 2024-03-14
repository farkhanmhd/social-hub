/**
 * - Login spec
 *  - Should display login page correctly
 *  - Should display alert when email is empty
 *  - Should display alert when password is empty
 *  - Should display modal when email and password are wrong
 *  - Should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });
  it("should display login page correctly", () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in this field");
    });
  });

  it("should display alert when password is empty", () => {
    cy.get('input[name="email"]').type("testing123@testing.com");

    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in this field");
    });
  });

  it("should display modal when email and password are wrong", () => {
    cy.get('input[name="email"]').type("testing123@testing.com");
    cy.get('input[name="password"]').type("12345678");

    cy.get('button[type="submit"]').click();

    cy.get("div[id=default-modal-container]").should("be.visible");
  });

  it("should display homepage when email and password are correct", () => {
    cy.get('input[name="email"]').type("testing123@testing.com");
    cy.get('input[name="password"]').type("testing123");

    cy.get('button[type="submit"]').click();

    cy.get("div[id=header-contents]").should("be.visible");
  });
});
