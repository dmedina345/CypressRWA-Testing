

describe("User Settings", ()=>{
    let userData;
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.fixture('user_data.json').then(function (data) {
          userData = data;
        })

    })
    it('Check my account button leads to user settings with correct form', () =>{
        cy.get('#username').should('exist').click().type(userData.valid_user)
        cy.get('#password').should('exist').click().type(userData.valid_pw)
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()
        cy.get('[data-test="sidenav-user-settings"]').should('exist').click()
        cy.location("pathname").should('eq', "/user/settings")
        cy.get('[data-test="user-settings-firstName-input"]').should('exist')
        cy.get('[data-test="user-settings-lastName-input"]').should('exist')
        cy.get('[data-test="user-settings-email-input"]').should('exist')
        cy.get('[data-test="user-settings-phoneNumber-input"]').should('exist')
        cy.get('[data-test="user-settings-submit"]').should('exist')
    })
    it('Check my account button can be edited', () =>{
        cy.get('#username').should('exist').click().type(userData.valid_user)
        cy.get('#password').should('exist').click().type(userData.valid_pw)
        cy.get('[data-test="signin-submit"]').should('be.enabled').click()
        cy.get('[data-test="sidenav-user-settings"]').should('exist').click()
        cy.get('[data-test="user-settings-firstName-input"]').clear().should('exist').type(userData.name_edit)
        cy.get('[data-test="user-settings-submit"]').should('exist').click()
        // Two ways to get field value and check it is equal to something.
        cy.get('[data-test="user-settings-firstName-input"]').invoke("val").then((text) =>{
            expect(text).equal(userData.name_edit)
        })
        cy.get('[data-test="user-settings-firstName-input"]').should('have.value', userData.name_edit)
    })
        
})