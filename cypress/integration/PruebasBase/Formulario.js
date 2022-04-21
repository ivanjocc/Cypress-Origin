describe("Formulario", () => {
  it("LLenar Campos Formulario", () => {
    cy.get("[data-qadp=form_firstname]");
    cy.get("[data-qadp=form_surname]");
    cy.get("[data-qadp=form_gender]");
    cy.get("[data-qadp=form_birthyear]");
    cy.get("[data-qadp=form_birthmonth]");
    cy.get("[data-qadp=form_birthday]");
    cy.get("[data-qadp=form_phone]");
    cy.get("[data-qadp=form_email]");
    cy.get("[data-qadp=form_tyc]");
    cy.get("[data-qadp=”form_mktg]");
    cy.get("[data-qadp=”form_submit]");
  });
});
