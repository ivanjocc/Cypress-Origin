import moment from "moment";
import { URLPRUEBA as url } from "../../../support/urls";
import { UrlTapIntoYourBeer } from "../../../support/urls";

describe("Test mayores de edad ", () => {
  beforeEach(() => {
    cy.setCookie("OptanonAlertBoxClosed", "2021-02-01T20:00:56.239Z");
    cy.visit(url);
  });

  it("Test mayor de edad, solo con el año", () => {
    const date = moment.utc().subtract(19, "years");
    cy.typeAgeGateYear(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("include", url);
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
    cy.url().should("include", url);
  });

  it("Test mayor de edad, Año - Mes - Día", () => {
    const date = moment.utc().subtract(18, "years");
    cy.typeAgeGateYear(date);
    cy.typeAgeGateMonth(date);
    cy.get("[data-qadp=button_enter_agegate]").click({ force: true });
    cy.url().should("include", url);
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
