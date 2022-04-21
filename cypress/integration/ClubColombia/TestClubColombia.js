import moment from "moment";
import { CLUB_COLOMBIA as url } from "../../support/urls";
import { UrlTapIntoYourBeer } from "../../support/urls";
import { UTM } from "../../support/urls";

describe("Test mayores de edad ", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });

  it("Test mayor de edad, solo con el año", () => {
    const date = moment.utc().subtract(19, "years");
    cy.typeAgeGateYear(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("contain", url);
  });

  it("Test mayor de edad, ingresando el año y el mes", () => {
    const today = moment.utc();
    if (today.month() === 0) {
      cy.wrap("Este test no debe correr en Enero").should("not.be.null");
      return;
    }
    const date = today.subtract(18, "years").subtract(1, "Month");
    cy.typeAgeGateYear(date);
    cy.typeAgeGateMonth(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("contain", url);
  });

  it("Test mayor de edad, Año - Mes - Día", () => {
    const date = moment.utc().subtract(18, "years");
    cy.typeAgeGateYear(date);
    cy.typeAgeGateMonth(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("contain", url);
  });
});

describe("Age gate Club Colombia Menor Edad", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });

  it("Test menor de edad, solo con el año", () => {
    const date = moment.utc().subtract(17, "years");
    cy.typeAgeGateYear(date);
    cy.url().should("include", UrlTapIntoYourBeer);
  });

  it("Test menor de edad, ingresando el año y el mes", () => {
    const today = moment.utc();
    if (today.month() === 11) {
      cy.wrap("This test does not run on December.").should("not.be.null");
      return;
    }
    const date = today.subtract(18, "years").add(1, "Month");
    cy.typeAgeGateYear(date);
    cy.typeAgeGateMonth(date);
    cy.url().should("include", UrlTapIntoYourBeer);
  });

  it("Test menor de edad, Año - Mes - Día", () => {
    const today = moment.utc();
    if (today.date() === today.clone().endOf("month").date()) {
      cy.wrap("Este test no debe correr en el día final del mes.").should(
        "not.be.null"
      );
      return;
    }
    const date = today.subtract(18, "years").add(1, "day");
    cy.typeAgeGateYear(date);
    cy.typeAgeGateMonth(date);
    cy.typeAgeGateDay(date);
    cy.url().should("include", UrlTapIntoYourBeer);
  });
});

describe("Validación Footer Club Colombia ", () => {
  it("Age gate Club Colombia", () => {
    const date = moment().subtract(19, "years");
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
    cy.typeAgeGateYear(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
  });

  //textos legales
  it("No comparta contenido con menores de edad", () => {
    cy.contains("No comparta este contenido con menores de edad.").should(
      "be.visible"
    );
  });

  //links legales
  it("2021 Anheuser-Busch InBev S.A", () => {
    cy.get("a")
      .contains("2021 Anheuser-Busch InBev S.A")
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

  it("Aviso  de privacidad", () => {
    cy.get("a")
      .contains("Aviso de privacidad")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/abilegal/aviso-de-privacidad");
  });

  it("Términos y condiciones generales", () => {
    cy.get("a")
      .contains("Términos y condiciones")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.bavaria.co/t%C3%A9rminos-y-condiciones");
  });

  it("Términos y condiciones campañas", () => {
    cy.get("a")
      .contains("Términos y condiciones Campañas")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/terminos-condiciones");
  });

  it("Política de protección de datos", () => {
    cy.get("a")
      .contains("Política de protección de datos")
      .should("be.visible")
      .and("have.attr", "href")
      .and(
        "include",
        "https://www.bavaria.co/abilegal/politica-deproteccion-de-datos-personales"
      );
  });

  it("Acordeón legal", () => {
    cy.get(".legal_accordion")
      .contains(
        "CANALES DE ATENCIÓN Y RESPUESTA A PETICIONES, CONSULTAS, QUEJAS Y RECLAMOS DE TITULARES DE DATOS PERSONALES"
      )
      .should("be.visible");
  });

  it("Contenido Acordeón legal", () => {
    cy.get(".legal_panel p").should(
      "have.text",
      "En caso que requiera consultar, rectificar, actualizar o eliminar sus datos personales le informamos que puede presentar su solicitud mediante los siguientes canales: (i) Comunicación dirigida a Bavaria & CIA S.C.A. área de Cumplimiento: Carrera 53 A N°. 127-35, Bogotá D.C. Colombia; (ii) Comunicación a través de correo electrónico: protecciondedatos@co.ab-inbev.com; (iii) Comunicación a través del teléfono: +57 6389000 al área de Cumplimiento. Por favor incluir, nombre del solicitante, plataforma, aplicación o web en la que se inscribió y el tratamiento que requiere frente a sus datos personales."
    );
  });

  //textos Redes Sociales

  it("Facebook", () => {
    cy.get('img[alt="facebook club colombia"]')
      .parent("a")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.facebook.com/clubcolombia.cerveza");
  });
  it("twitter", () => {
    cy.get('img[alt="twitter club colombia"]')
      .parent("a")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://twitter.com/Club_Colombia");
  });

  it("Instagram", () => {
    cy.get('img[alt="instagram club colombia"]')
      .should("be.visible")
      .parent("a")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.instagram.com/clubcolombia/");
  });

  it("Youtube", () => {
    cy.get('img[alt="youtube club colombia"]')
      .should("be.visible")
      .parent("a")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.youtube.com/user/CervezaClubColombia");
  });

  it("Imagen legal - El exceso de alcohol es perjudicial", () => {
    cy.get('img[alt="club colombia legal"]').should("be.visible");
  });
});

describe("Validación GTM", () => {
  it("Test GTM Presente", () => {
    cy.visit(url);
    cy.window({ timeout: 1000 })
      .should("have.property", "google_tag_manager")
      .and("have.property", "GTM-5QMKDP");
  });
});

describe("Validación UTM Club Colombia", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });
  it("Test Utm Club Colombia", () => {
    const date = moment.utc().subtract(19, "years");
    const urlBase = url;
    const utmFinal = urlBase + UTM;
    cy.visit(utmFinal);
    cy.typeAgeGateYear(date);

    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("contain", UTM);
  });
});
