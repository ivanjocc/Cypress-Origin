import { URLPRUEBA_SI_NO as url } from "../../../support/urls";
import { UrlTapIntoYourBeer } from "../../../support/urls";

describe("Age gate de si y no ", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T21:55:00.524Z");
    cy.visit(url);
  });

  //Validación del Age Gate
  it("Test Age gate si", () => {
    cy.get("[data-qadp=age_gate_yes").click();
    cy.url().should("include", url);
  });

  it("Age gate no", () => {
    cy.get("[data-qadp=age_gate_no").click();
    cy.url().should("include", UrlTapIntoYourBeer);
  });
});
