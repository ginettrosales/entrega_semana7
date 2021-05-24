export class GhostPage {
    
    constructor(){
        this.waitingTime = 3000;
    }

    login(){
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(Cypress.env('email'))
        cy.get('#ember10').type(Cypress.env('pass'))
        cy.get('#login').submit()
        cy.wait(this.waitingTime)
    }

    accederAPages(){
        cy.get('section.gh-nav-body ul.gh-nav-list.gh-nav-manage li > a[href="#/pages/"]').click({force:true})
        cy.wait(this.waitingTime)
    }

    crearNuevoPage(title){
        cy.get('section.view-actions a[href="#/editor/page/"]').click({force:true})
        cy.wait(this.waitingTime)
        cy.get('textarea[placeholder="Page Title"]').focus().type(title)
        cy.get('header').click({force:true})
        cy.wait(this.waitingTime)
        cy.get('header div div a[href="#/pages/"]').click({force:true})
    }
}