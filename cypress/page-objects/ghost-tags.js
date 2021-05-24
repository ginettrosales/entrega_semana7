

export class GhostTag {
    login() {
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(Cypress.env('email'))
        cy.get('#ember10').type(Cypress.env('pass'))
        cy.get('#login').submit()
    }

    goTags() {
        cy.visit('ghost/#/tags')
    }

    selectTag() {
        cy.get('ol.tags-list',{ timeout: 10000 }).find('li.gh-tags-list-item > a').first().click({ force: true })
    }
    
    selectInternalTag() {
        cy.get('div.gh-contentfilter').find('button.gh-btn > span').contains('Internal tags').click({ force: true })
        cy.get('ol.tags-list',{ timeout: 10000 }).find('li.gh-tags-list-item > a').first().click({ force: true })
    }
   
  
  loginUserOnly() {
    cy.visit('ghost/#/signin')
    cy.get('#ember8').type(Cypress.env('email'))
    cy.get('#login').submit() 
    }
    
    countRows() {
        cy.visit('ghost/#/tags')
        console.log(cy.get('ol.tags-list').length)
        return cy.get('ol.tags-list').length
    }

    createTag(internal = false) {
        cy.visit('ghost/#/tags')
        cy.wait(5000)
        cy.get('span').contains('New tag').click({ force: true })
        if (internal) {
            cy.get('#tag-name').type('#New Tag holi')
        }
        else  {
            cy.get('#tag-name').type('New Tag holi')
        }
        
        cy.get('#tag-slug').type('ntag')
        cy.get('#tag-description').type('This is a new tag')
        cy.get('section.view-actions > button').click({ force: true })
        cy.visit('ghost/#/tags')
    }

   

}