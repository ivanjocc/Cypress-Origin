import { UrlBudweiser } from "../../support/urls";
import { UrlTapIntoYourBeer } from "../../support/urls";
import { UrlBudweiser2 } from "../../support/urls";
import { UTM } from "../../support/urls";

var moment = require("moment"); // require
describe("Test age gate Budweiser", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-12T19:14:28.120Z");
    cy.visit(UrlBudweiser);
  });
  before(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });
});
// Estos son los test del Footer

describe("Validación Footer Budweiser ", () => {
  before(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  beforeEach("set cookie", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-09T17:25:04.013Z");
    cy.visit(UrlBudweiser);
  });

  //textos legales
  it("No comparta contenido con menores de edad", () => {
    cy.contains("No comparta este contenido con menores de edad", {
      matchCase: false,
    }).should("be.visible");
  });
  it("El exceso de alcohol es perjudicial para la salud", () => {
    cy.contains("EL EXCESO DE ALCOHOL ES PERJUDICIAL PARA LA SALUD").should(
      "be.visible"
    );
  });

  //links legales
  it("ANHEUSER-BUSCH INBEV © 2022", () => {
    cy.get("a")
      .contains("Anheuser-Busch InBev © 2022", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("eql", "https://www.ab-inbev.com");
  });

  it("Vive Responsable", () => {
    cy.get("a")
      .contains("Vive Responsable", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/viveresponsable");
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

  it("Contacto", () => {
    cy.get("a")
      .contains("Contacto")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/contactenos");
  });

  it("Aviso de privacidad", () => {
    cy.get("a")
      .contains("Aviso de privacidad", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "abilegal/aviso-de-privacidad", { matchCase: false });
  });

  it("Términos y condiciones generales", () => {
    cy.get("a")
      .contains("Términos y condiciones", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/term%C3%ADnos-y-condiciones");
  });

  it("Política de protección de datos", () => {
    cy.get("a")
      .contains("Políticas de protección de datos", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/abilegal/politica-deproteccion-de-datos-personales");
  });

  //links Redes Sociales
  it("Facebook", () => {
    cy.contains("facebook", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.facebook.com/CervezaBudweiserColombia");
  });
  it("Instragram", () => {
    cy.contains("instagram", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.instagram.com/budcolombia/?hl=es-la");
  });

  it("Twitter", () => {
    const twitter = "https://twitter.com/BudweiserCo";
    cy.get(`a[href="${twitter}"]`).should("be.visible");
  });

  it("Youtube", () => {
    cy.contains("youtube", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.youtube.com/BudweiserColombia");
  });

  it("Hablemos de alcohol", () => {
    const hablemosdealcohol =
      "/themes/custom/budweiser_co/images/hablemos-de-alcohol.png";
    cy.get(`img[src="${hablemosdealcohol}"]`).should("be.visible");
  });
});

describe("Validación GTM", () => {
  it("Test GTM Presente", () => {
    cy.visit(UrlBudweiser);
    cy.window({ timeout: 1000 })
      .should("have.property", "google_tag_manager")
      .and("have.property", "GTM-T4MHS8R");
    // cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
  });
});
