import { URLPRUEBA_SI_NO, UrlTapIntoYourBeer } from "./urls";
import { URLPRUEBA_SI_NO as url } from "./urls";

var moment = require("moment"); // require
describe("Test age gate Budweiser", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-12T19:14:28.120Z");
    cy.visit(URLPRUEBA_SI_NO);
  });
  before(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });
});


// Elementos del Footer

describe("Validación Footer", () => {
  before(() => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  beforeEach("set cookie", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-09T17:25:04.013Z");
    cy.visit(URLPRUEBA_SI_NO);
  });

  //Textos Legales
  it("No comparta contenido con menores de edad", () => {
    cy.contains("NO COMPARTA ESTE CONTENIDO CON MENORES DE EDAD", {
      matchCase: false,
    }).should("be.visible");
  });

  it("Todo con medida", () => {
    cy.contains("TODO CON MEDIDA").should(
      "be.visible"
    );
  });

  //Links Legales
  it("ANHEUSER-BUSCH INBEV © 2022", () => {
    cy.get("a")
      .contains("Anheuser-Busch InBev © 2022", { matchCase: false })
      .should("be.visible")
      // .and("have.attr", "href")
      .and("include", "https://www.ab-inbev.com");
  });

  it("Términos y condiciones de uso", () => {
    cy.get("a")
      .contains("TÉRMINOS Y CONDICIONES DE USO", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://portal.grupomodelo.com/es/terminos.html");
  });

  it("Aviso de privacidad", () => {
    cy.get("a")
      .contains("AVISO DE PRIVACIDAD")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.grupomodelo.com/abilegal/politica-deproteccion-de-datos-personales");
  });

  it("Hablemos de alcohol", () => {
    cy.get("a")
      .contains("Hablemos de alcohol", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.tapintoyourbeer.com");
  });

  it("Contáctenos", () => {
    cy.get("a")
      .contains("Contáctenos", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://portal.grupomodelo.com/es/noticias/contactanos");
  });

  //Links Redes Sociales
  it("Facebook", () => {
    cy.contains("facebook", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.facebook.com/MichelobUltraMx");
  });

  it("Instagram", () => {
    cy.contains("instagram", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.instagram.com/michelobultramx/");
  });

  it("Twitter", () => {
    const twitter = "https://twitter.com/michelobultramx?s=21";
    cy.get(`a[href="${twitter}"]`).should("be.visible");
  });

  it("Youtube", () => {
    cy.contains("youtube", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.youtube.com/c/MichelobUltraMexico");
  });
});


// VALIDACION GTM

describe("Validación GTM", () => {
  it("Test GTM Presente", () => {
    cy.visit(URLPRUEBA_SI_NO);
    cy.window({ timeout: 1000 })
      .should("have.property", "google_tag_manager")
      .and("have.property", "GTM-T4MHS8R");
    // cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
  });
});


// AGE GATE

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
