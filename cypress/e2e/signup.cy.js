/// <reference types="cypress" />

describe('RWA Signup tests', () => {
    let userData;
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup')
      cy.fixture('user_data.json').then(function (data) {
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
    it('Signup form submit ok', () => {
      cy.get('.makeStyles-form-4').should('exist')
      cy.get('#firstName').should('exist').click().type(userData.name)
      cy.get('#lastName').should('exist').click().type(userData.lastname)
      cy.get('#username').should('exist').click().type(userData.new_user)
      cy.get('#password').should('exist').click().type(userData.valid_pw)
      cy.get('#confirmPassword').should('exist').click().type(userData.valid_pw)
      cy.get('[data-test="signup-submit"]').should('be.enabled').click()
      cy.location("pathname").should("eq", "/signin")
    })  
  
  })