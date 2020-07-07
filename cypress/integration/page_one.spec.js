import { makeServer } from "../../src/server"

let server

beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

describe("Page One Test", () => {
  it("Visits Page One", () => {
    cy.visit("http://localhost:3000/?page=1");
  });

  it("Validates text input", () => {
    cy.visit("http://localhost:3000/?page=1");

    cy.get("input").type("one").should("have.value", "one");
    cy.get("button").click()
    cy.get("p").should("have.text", "Validation status: valid");
  });
});
