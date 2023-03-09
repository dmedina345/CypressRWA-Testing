/// <reference types="cypress" />

describe('Notifications', ()=>{
    let userData;
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.fixture('user_data.json').then(function (data) {
          userData = data;
        })

    })
    it.only('Buttons lead to notif page', () =>{
        cy.get('#username').should('exist').click().type(userData.valid_user)
        cy.get('#password').should('exist').click().type(userData.valid_pw)
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()
        cy.get('[data-test="sidenav-notifications"]').should('exist').click()
        cy.location('pathname').should('eq', '/notifications')
        cy.get('[data-test="sidenav-notifications"]').should('exist').click()
        cy.location('pathname').should('eq', '/notifications')
    })
    it.only('Dismiss notification', () =>{
        cy.get('#username').should('exist').click().type(userData.valid_user)
        cy.get('#password').should('exist').click().type(userData.valid_pw)
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()
        cy.get('[data-test="sidenav-notifications"]').should('exist').click()
        cy.get('[data-test="notification-list-item-tk8jNBQURvQz"]').should('exist')
        //Without force:true it will fail because the element is covered by another.
        cy.get('[data-test="notification-mark-read-tk8jNBQURvQz"]').click({force: true})
        cy.get('[data-test="notification-list-item-tk8jNBQURvQz"]').should('not.exist')

    })
})