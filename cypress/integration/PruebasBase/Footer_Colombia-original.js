const { utc } = require("moment");
import { URLPRUEBA as url } from "../../support/urls";

describe("Validación Footer Colombia ", () => {
  beforeEach("set cookie", () => {});

  it("Pasar age gate Test Age gate", () => {
    // cy.get("[data-qadp=age_gate_yes").click();
    //cy.url().should("eql", UrlColaYPola);
  });
  //textos legales
  it("No comparta contenido con menores de edad", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-09T17:25:04.013Z");
    cy.visit(url);
    cy.contains("No comparta este contenido con menores de edad", {
      matchCase: false,
    }).should("be.visible");
  });
  it("El exceso de alcohol es perjudicial para la salud", () => {
    cy.contains("EL EXCESO DE ALCOHOL ES PERJUDICIAL PARA LA SALUD", {
      matchCase: false,
    }).should("be.visible");
  });

  //links legales
  it("2022 Anheuser-Busch InBev S.A", () => {
    cy.get("a")
      .contains("Anheuser-Busch InBev © 2022", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.ab-inbev.com");
  });

  it("Vive Responsable", () => {
    cy.get("a")
      .contains("Vive Responsable", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/viveresponsable");
  });

  it("Contáctenos", () => {
    cy.get("a")
      .contains("Contáctenos", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/contactenos");
  });

  it("Aviso de privacidad", () => {
    cy.get("a")
      .contains("Aviso de privacidad", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/abilegal/aviso-de-privacidad");
  });

  it("Términos y condiciones generales", () => {
    cy.get("a")
      .contains("Términos y condiciones", { matchCase: false })
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
      .contains("Política de Protección de Datos Personales", {
        matchCase: false,
      })
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
});
