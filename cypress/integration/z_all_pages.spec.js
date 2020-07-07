import { makeServer } from "../../src/server"

let server

beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

const URL = "http://localhost:3000/";

describe("Test all the things", () => {
  it("Clicks on stuff", () => {
    cy.visit(URL);

    cy.get('a').contains('Page 1').click()

    cy.url().should("eq", `${URL}?page=1`);

    cy.get("input").type("one").should("have.value", "one");
    cy.get("button").click()
    cy.get("p").should("have.text", "Validation status: valid");

    cy.get('a').contains('Page 2').click()

    cy.url().should("eq", `${URL}?page=2`);

    cy.get("input").type("two").should("have.value", "two");
    cy.get("button").click()
    cy.get("p").should("have.text", "Validation status: valid");
  });
});
