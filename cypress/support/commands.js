// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "typeAgeGateYear",
  (date, { attribute = "data-qadp", valuePrefix = "age_gate_year_" } = {}) => {
    const year = date.format("YYYY");
    cy.get(`[${attribute}=${valuePrefix}1]`)
      .should("be.visible")
      .type(year.charAt(0));
    cy.get(`[${attribute}=${valuePrefix}2]`)
      .should("be.visible")
      .type(year.charAt(1));
    cy.get(`[${attribute}=${valuePrefix}3]`)
      .should("be.visible")
      .type(year.charAt(2));
    return cy
      .get(`[${attribute}=${valuePrefix}4]`)
      .should("be.visible")
      .type(year.charAt(3));
  }
);
// cy.typeAgeGateMonth(date)
Cypress.Commands.add(
  "typeAgeGateMonth",
  (date, { attribute = "data-qadp", valuePrefix = "age_gate_month_" } = {}) => {
    const month = date.format("MM");
    cy.get(`[${attribute}=${valuePrefix}1]`)
      .should("be.visible")
      .type(month.charAt(0));
    return cy
      .get(`[${attribute}=${valuePrefix}2]`)
      .should("be.visible")
      .type(month.charAt(1));
  }
);

Cypress.Commands.add(
  "typeAgeGateDay",
  (date, { attribute = "data-qadp", valuePrefix = "age_gate_day_" } = {}) => {
    const day = date.format("DD");
    cy.get(`[${attribute}=${valuePrefix}1]`)
      .should("be.visible")
      .type(day.charAt(0));
    return cy
      .get(`[${attribute}=${valuePrefix}2]`)
      .should("be.visible")
      .type(day.charAt(1));
  }
);
