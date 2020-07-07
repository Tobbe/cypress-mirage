import { makeServer } from "../../src/server"

let server

beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

describe("Page Two Test", () => {
  it("Visits Page Two", () => {
    cy.visit("http://localhost:3000/?page=2");
  });

  it("Validates text input", () => {
    server.get("/validate", () => {
      console.log("override validation");
      return { valid: false }
      // return new Response(500, {}, { error: "Internal Server Error" });
    });

    cy.visit("http://localhost:3000/?page=2");

    cy.get("input").type("two").should("have.value", "two");
    cy.get("button").click()
    cy.get("p").should("have.text", "Validation status: not valid");
  });
});
