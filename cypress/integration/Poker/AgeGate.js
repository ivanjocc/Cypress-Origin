import { UrlPoker as url } from "../../support/urls";
import { UrlTapIntoYourBeer } from "../../support/urls";

describe("Test mayores de edad ", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });

  it.skip("Test Age gate mayor edad Cola y Pola", () => {
    cy.get("[data-qadp=age_gate_yes").click();
    cy.url().should("eql", UrlColaYPola);
  });

  it.skip("Age gate como menor de edad Cola y Pola", () => {
    cy.get("[data-qadp=age_gate_no").click();
    cy.url().should("eql", UrlColaYPola);
    cy.url().should("include", UrlTapIntoYourBeer);
  });
});

describe("Validación Footer poker ", () => {
  it("viistar sitio", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });

  //textos legales
  it("No comparta contenido con menores de edad", () => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T21:55:00.524Z");
    cy.visit(url);
    cy.contains("No compartir este contenido con menores de edad.").should(
      "be.visible"
    );
  });

  //links legales

  it("ANHEUSER BUSCH INBEV © 2021", () => {
    const linkabi = "https://www.ab-inbev.com/";
    cy.get(`a[href="${linkabi}"]`)
      .should("be.visible")
      .should("have.attr", "href")
      .and("include", "https://www.ab-inbev.com/")
      .get("p")
      .should("contain", "ANHEUSER BUSCH INBEV © 2021");
  });

  it("Vive Responsable", () => {
    cy.get("a")
      .contains("Vive Responsable")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/viveresponsable");
  });

  it("Contactenos", () => {
    cy.get("a")
      .contains("Contactenos")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/contactenos");
  });

  it("Aviso  de privacidad", () => {
    cy.get("li a")
      .contains("Aviso de Privacidad", { matchCase: false })
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/abilegal/aviso-de-privacidad");
  });

  it("Términos y Condiciones", () => {
    cy.get("a")
      .contains("Términos y Condiciones")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/t%C3%A9rminos-y-condiciones");
  });

  it("Politica de Protección de Datos Personales", () => {
    cy.get("a")
      .contains("Politica de Protección de Datos Personales", {
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

  //Redes Sociales

  it("Facebook", () => {
    const facebook = "https://www.facebook.com/CervezaPoker";
    cy.get(`a[href="${facebook}"]`).should("be.visible");
  });

  it("Twitter", () => {
    const twitter = "https://twitter.com/CervezaPoker";
    cy.get(`a[href="${twitter}"]`).should("be.visible");
  });

  it("Youtube", () => {
    const youtube = "http://www.youtube.com/c/CervezaPokerColombia";
    cy.get(`a[href="${youtube}"]`).should("be.visible");
  });

  it("Instagram", () => {
    const instagram = "https://www.instagram.com/cervezapoker";
    cy.get(`a[href="${instagram}"]`).should("be.visible");
  });

  it("Imagen legal - El exceso de alcohol el perjudicial", () => {
    cy.get('img[alt="bavaria"]').should("be.visible");
  });

  //pendiente prueba de acordeon en el momento no se encuentra en la pag
});

describe("Validación GTM", () => {
  it("Test GTM Presente", () => {
    cy.visit(url);
    cy.window({ timeout: 1000 })
      .should("have.property", "google_tag_manager")
      .and("have.property", "GTM-PWNXBV");
    // cy.window({ timeout: 1000 }).should("have.property", "dataLayer");
  });
});
