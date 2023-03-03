/// <reference types="cypress" />

describe('RWA Login auth testing', () => {
  let userData;
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.fixture('example.json').then(function (data) {
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

describe('RWA Signup tests', () => {
  let userData;
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
    cy.fixture('example.json').then(function (data) {
      userData = data;
  })
 })
  it('Signup form loads', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-test="signup"]').should('exist').click()
    cy.location("pathname").should("eq", "/signup")
    cy.get('.makeStyles-form-18').should('exist')
  })
  it('Signup form is disabled with empty data', () => {
    cy.get('.makeStyles-form-4').should('exist')
    cy.get('#confirmPassword').should('exist').click()
    cy.get('[data-test="signup-submit"]').should('be.disabled')
  })  
  it('Signup fields are mandatory', () => {
    cy.get('.makeStyles-form-4').should('exist')
    cy.get('#firstName').should('exist').click()
    cy.get('#lastName').should('exist').click()
    cy.get('#firstName:invalid').invoke('prop', 'validationMessage').should('exist')
    cy.get('#username').should('exist').click()
    cy.get('#lastName:invalid').invoke('prop', 'validationMessage').should('exist')
    cy.get('#password').should('exist').click()
    cy.get('#username:invalid').invoke('prop', 'validationMessage').should('exist')
    cy.get('#confirmPassword').should('exist').click()
    cy.get('#password:invalid').invoke('prop', 'validationMessage').should('exist')
    cy.get('#password').click()
    cy.get('#confirmPassword:invalid').invoke('prop', 'validationMessage').should('exist')
    cy.get('[data-test="signup-submit"]').should('be.disabled')
  })  

})
