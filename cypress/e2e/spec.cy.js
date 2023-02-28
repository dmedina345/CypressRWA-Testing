/// <reference types="cypress" />

describe('RWA Login auth testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('Base url leads to signin', () => {
    cy.visit('http://localhost:3000/')
    cy.location("pathname").should("eq", "/signin")
    cy.get('#username').should('exist')
    cy.get('#password').should('exist').click()
    cy.get('[data-test="signin-submit"]').should('be.disabled')
  })
})