var moment = require("moment");
import { UrlColaYPola } from "../../support/urls";
import { UrlTapIntoYourBeer } from "../../support/urls";
import { UTM } from "../../support/urls";

describe("Age gate Cola y Pola", () => {
  beforeEach(() => {
    cy.visit(UrlColaYPola);
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T21:55:00.524Z");
  });

  //Validación del Age Gate
  it("Test Age gate mayor edad Cola y Pola", () => {
    cy.get("[data-qadp=age_gate_yes").click();
    cy.url().should("eql", UrlColaYPola);
  });

  it("Age gate como menor de edad Cola y Pola", () => {
    cy.get("[data-qadp=age_gate_no").click();
    cy.url().should("eql", UrlColaYPola);
    cy.url().should("include", UrlTapIntoYourBeer);
  });
});

describe("Validación Footer Colombia ", () => {
  beforeEach("set cookie", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-09T17:25:04.013Z");
  });

  it("Test Age gate mayor edad Cola y Pola", () => {
    cy.visit(UrlColaYPola);
    cy.get("[data-qadp=age_gate_yes").click();
    cy.url().should("eql", UrlColaYPola);
  });
  //textos legales
  it("No comparta contenido con menores de edad", () => {
    cy.contains("No comparta este contenido con menores de edad").should(
      "be.visible"
    );
  });
  it("El exceso de alcohol es perjudicial para la salud", () => {
    cy.server();
    cy.route("POST", "/agegate*").as("getwait");
    cy.contains("EL EXCESO DE ALCOHOL ES PERJUDICIAL PARA LA SALUD").should(
      "be.visible"
    );
  });

  //links legales
  it("2020 Anheuser-Busch InBev S.A", () => {
    cy.get("a")
      .contains("2020 Anheuser-Busch InBev S.A")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.ab-inbev.com/");
  });

  it("Vive Responsable", () => {
    cy.get("a")
      .contains("Vive Responsable")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/viveresponsable");
  });

  it("Contacto", () => {
    cy.get("a")
      .contains("Contacto")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/contactanos");
  });

  it("Aviso de privacidad ", () => {
    cy.get("a")
      .contains("Aviso de privacidad ")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/aviso-de-privacidad");
  });

  it.skip("Términos y condiciones generales", () => {
    cy.get("a")
      .should("have.text", "Términos y condiciones campañas")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/t%C3%A9rminos-y-condiciones");
  });

  it("Términos y condiciones campaña", () => {
    cy.get("a")
      .contains("Términos y condiciones campañas")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/legal");
  });

  it("Política de protección de datos", () => {
    cy.get("a")
      .contains("Política de Protección de Datos Personales ")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/abilegal/politica-deproteccion-de-datos-personales");
  });

  it("Link superintendencia", () => {
    cy.get("a")
      .contains("Superintendencia de Industria y Comercio", {
        matchCase: false,
      })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.sic.gov.co/");
  });

  //links Redes Sociales

  it("Facebook", () => {
    const facebook = "https://www.facebook.com/colaypola/";
    cy.get(`a[href="${facebook}"]`).should("be.visible");
  });

  it("Instagram", () => {
    const Instagram = "https://www.instagram.com/colaypolaoficial/";
    cy.get(`a[href="${Instagram}"]`).should("be.visible");
  });

  it("Youtube", () => {
    const youtube = "https://twitter.com/colaypola";
    cy.get(`a[href="${youtube}"]`).should("be.visible");
  });

  it("Imagen legal - prohibase el expendio de bebidas embriagantes a menores de edad", () => {
    cy.get('img[alt="legal Cola & Pola"]').should("be.visible");
  });
});

describe("Validación GTM", () => {
  it("Test GTM Presente", () => {
    cy.visit(UrlColaYPola);
    cy.window({ timeout: 1000 })
      .should("have.property", "google_tag_manager")
      .and("have.property", "GTM-W9FDCT");
    // cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
  });
});

describe("Validación UTM Cola y Pola ", () => {
  it("Test Utm cola y pola", () => {
    const urlBase = UrlColaYPola;
    const utm =
      "?utm_source=test-qa-utm-source&utm_medium=test-qa-utm-medium&utm_campaign=bavaria&utm_term=prueba&utm_content=test";
    const utmFinal = urlBase + utm;
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T21:55:00.524Z");
    cy.visit(utmFinal);

    it("Test Age gate mayor edad Cola y Pola", () => {
      cy.get("[data-qadp=age_gate_yes").click();
      cy.url().should("eql", UrlColaYPola);
    });

    cy.url().should("contain", UTM);
  });
});
