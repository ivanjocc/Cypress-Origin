import { URLPRUEBA_SI_NO as url } from "../../../support/urls";
import { UTM } from "../../../support/urls";
import { GTM_SI_NO } from "../../../support/urls";

describe("Validación UTM ", () => {
  var moment = require("moment"); // require

  describe("Validación UTM", () => {
    beforeEach(() => {
      cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
      cy.visit(url);
    });

    it("Test Age gate si", () => {
      const urlBase = url;
      const utmFinal = urlBase + UTM;
      cy.visit(utmFinal);
      cy.get("[data-qadp=age_gate_yes").click();
      cy.url().should("include", UTM);
    });
  });

  describe("Validación GTM", () => {
    it("Test GTM Presente", () => {
      cy.visit(url);
      cy.window({ timeout: 1000 })
        .should("have.property", "google_tag_manager")
        .and("have.property", GTM_SI_NO);
      cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
    });
  });
});
