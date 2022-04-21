import { URLPRUEBA as url } from "../../../support/urls";
import { UTM } from "../../../support/urls";
import { GTM } from "../../../support/urls";

describe("Validación UTM ", () => {
  var moment = require("moment"); // require

  describe("Validación UTM", () => {
    beforeEach(() => {
      cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
      cy.visit(url);
    });

    it("Test Utm", () => {
      const date = moment.utc().subtract(19, "years");
      const urlBase = url;
      const utmFinal = urlBase + UTM;
      cy.visit(utmFinal);
      cy.typeAgeGateYear(date);

      cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
      cy.url().should("contain", UTM);
    });
  });

  describe("Validación GTM", () => {
    it("Test GTM Presente", () => {
      cy.visit(url);
      cy.window({ timeout: 1000 })
        .should("have.property", "google_tag_manager")
        .and("have.property", GTM);
      cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
    });
  });
});
