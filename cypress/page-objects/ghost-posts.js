const faker = require('faker');

export class GhostPost {
    login() {
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(Cypress.env('email'))
        cy.get('#ember10').type(Cypress.env('pass'))
        cy.get('#login').submit()
    }

    loginIncorrecto() {
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(faker.internet.email())
        cy.get('#ember10').type(faker.internet.password())
        cy.get('#login').submit()
    }

    loginUserOnly() {
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(Cypress.env('email'))
        cy.get('#login').submit() 
    }

    goPosts() {
        cy.visit('ghost/#/posts')
    }

    postTitle(){
        cy.get('li.gh-nav-list-new a.gh-nav-new-post').click()
        cy.get('.gh-editor-title').click()
    }

    createDraftPost() {
        cy.get('section.view-actions > a[href="#/editor/post/"]').click({force: true})
        cy.get('.gh-editor-title').type(faker.name.title()).invoke('val')
            .then(val => {
                const postTitle = val
            })
        cy.get('button.post-settings').click()
    }

    selectLastedPost() {
        cy.get('ol.posts-list', { timeout: 10000 })
            .find('li.gh-posts-list-item > a').first().click({ force: true })
    }

    selectPublishedPost() {
        cy.get('ol.posts-list li', { timeout: 10000 })
            .find('a.gh-post-list-status > div > span.gh-content-status-published').first().click({ force: true })
    }

    publishPost() {
        cy.get('div.gh-publishmenu-trigger > span').click()
        cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button').click()
    }

    openPostSettings() {
        cy.url({ timeout: 10000 }).should('contain', '/editor/post/')
        cy.get('button.post-settings').click()
    }

    changePostStatus() {
        cy.get('div.gh-publishmenu-trigger').click()
        cy.get('section.gh-publishmenu-section div.gh-publishmenu-radio').first().click()
        cy.get('div.gh-publishmenu-radio').first()
            .should('have.class', 'active')
        cy.get('footer.gh-publishmenu-footer button.gh-publishmenu-button').click()
    }

    addMetadata() {
        cy.get('div.settings-menu-content ul li.nav-list-item').first().click()
    }
}