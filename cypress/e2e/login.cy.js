/// <reference types="cypress" />

describe('RWA Login auth testing', () => {
  let userData;
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.fixture('user_data.json').then(function (data) {
      userData = data;
  })
})
  it('Base url leads to signin', () => {
    cy.visit('http://localhost:3000/')
    cy.location("pathname").should("eq", "/signin")
    cy.get('#username').should('exist')
    cy.get('#password').should('exist').click()
    cy.get('[data-test="signin-submit"]').should('be.disabled')
  })
  it('Invalid username or password', () => {
    cy.visit('http://localhost:3000/')
    cy.location("pathname").should("eq", "/signin")
    cy.get('#username').should('exist').click().type(userData.invalid_user)
    cy.get('#password').should('exist').click().type(userData.invalid_pw)
    cy.get('[data-test="signin-submit"]').should('be.enabled').click()
    cy.get('.MuiAlert-message').should('exist').contains('is invalid')
  })
  it('Login with valid username and password', () => {
    cy.visit('http://localhost:3000/')
    cy.location("pathname").should("eq", "/signin")
    cy.get('#username').should('exist').click().type(userData.valid_user)
    cy.get('#password').should('exist').click().type(userData.valid_pw)
    cy.get('[data-test="signin-submit"]').should('be.enabled').click()
    cy.get('[data-test="sidenav-signout"]').should('exist')
  })
  it('Logout works', () => {
    cy.visit('http://localhost:3000/')
    cy.location("pathname").should("eq", "/signin")
    cy.get('#username').should('exist').click().type(userData.valid_user)
    cy.get('#password').should('exist').click().type(userData.valid_pw)
    cy.get('[data-test="signin-submit"]').should('be.enabled').click()
    cy.get('[data-test="sidenav-signout"]').should('exist').click()
    cy.location("pathname").should("eq", "/signin")
  })
})

