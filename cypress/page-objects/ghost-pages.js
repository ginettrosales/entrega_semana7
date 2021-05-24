export class GhostPage {
    
    constructor(){
        this.waitingTime = 60000;
    }

    login(){
        cy.visit('ghost/#/signin')
        cy.get('#ember8').type(Cypress.env('email'))
        cy.get('#ember10').type(Cypress.env('pass'))
        cy.get('#login').submit()
        //cy.wait(this.waitingTime)
    }

    accederAPages(){
        cy.get('section.gh-nav-body ul.gh-nav-list.gh-nav-manage li > a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
        //cy.wait(this.waitingTime)
    }

    crearNuevoPage(title){
        cy.get('section.view-actions a[href="#/editor/page/"]', {timeout:this.waitingTime}).click({force:true})
        //cy.wait(this.waitingTime)
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        //cy.wait(this.waitingTime)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
    }

    eliminarPage(){
        cy.visit('/ghost/#/pages', {timeout:this.waitingTime})
        //cy.wait(5000)
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button[title="Settings"]', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view span', {timeout:this.waitingTime}).first().click({force:true})
    }

    insertarTag(title, tag_content){
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button[title="Settings"]', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('#tag-input', {timeout:this.waitingTime}).type(tag_content + '{enter}')
        cy.get('header').click({force:true})
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        //cy.wait(5000)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
    }

    insertarTag_v2(title, tag_content){
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button[title="Settings"]', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('#tag-input', {timeout:this.waitingTime}).type(tag_content + '{enter}')
        cy.get('header').click({force:true})
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        //cy.wait(5000)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
        cy.get('div.modal-footer button.gh-btn-red', {timeout:this.waitingTime}).click({force:true})
    }

    publicarPage(title){
        cy.get('section.view-actions a[href="#/editor/page/"]', {timeout:this.waitingTime}).click({force:true})
        //cy.wait(this.waitingTime)
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('div.gh-publishmenu div', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button.gh-btn-blue', {timeout:this.waitingTime}).click({force:true})
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').first().click({force:true})
        cy.wait(3000)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
        cy.get('button.gh-btn-red', {timeout:this.waitingTime}).first().click({force:true})
    }

    crearNuevoPage_faker(title){
        cy.get('section.view-actions a[href="#/editor/page/"]', {timeout:this.waitingTime}).click({force:true})
        //cy.wait(this.waitingTime)
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        cy.wait(10000)
        //cy.wait(this.waitingTime)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
    }

    editarUrl(title, tag_content){
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button[title="Settings"]', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('#url', {timeout:this.waitingTime}).clear().type(tag_content + '{enter}')
        cy.get('header').click({force:true})
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        //cy.wait(5000)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
    }

    editarExcerpt(title, tag_content){
        cy.get('ol li a[title="Edit this page"]', {timeout:this.waitingTime}).first().click({force:true})
        cy.get('button[title="Settings"]', {timeout:this.waitingTime}).focus().click({force:true})
        cy.get('textarea[name="post-setting-custom-excerpt"]', {timeout:this.waitingTime}).clear().type(tag_content + '{enter}')
        cy.get('header').click({force:true})
        cy.get('textarea[placeholder="Page Title"]', {timeout:this.waitingTime}).focus().type(title)
        cy.get('header').click({force:true})
        //cy.wait(5000)
        cy.get('header div div a[href="#/pages/"]', {timeout:this.waitingTime}).click({force:true})
    }
}