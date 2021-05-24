import { GhostPost } from "../page-objects/ghost-posts";

const ghost = new GhostPost(),
    faker = require('faker'),
    priori = require('../fixtures/a-priori/post-data.json'),
    pseudo = require('../fixtures/pseudo/post-data.json'),
    random = faker.random.number({ min: 0, max: 100 })
    
describe('Posts', () => {

    context('Post title', () => {

        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })
        
        it('E01-Crear nuevo post y agregar titulo valido', () => { // crear titulo priori pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(priori.postTitle)
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E02-Crear nuevo post y agregar titulo vacio', () => { // crear titulo empty
            ghost.postTitle()
            cy.get('.gh-editor-title').type(' ')
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E03-Crear nuevo post y agregar titulo con caracteres especiales', () => { // aleatorio
            ghost.postTitle()
            cy.get('.gh-editor-title').type(faker.datatype.string())
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E04-Crear nuevo post y agregar titulo solo con numeros', () => { // aleatorio
            ghost.postTitle()
            cy.get('.gh-editor-title').type(faker.datatype.float())
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E05-Crear nuevo post y agregar titulo que ya existe', () => { // crear titulo priori pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(priori.postTitle)
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E06-Crear nuevo post y agregar titulo < 255 caracteres', () => { //  crear titulo priori pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(priori.postTitle254)
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E07-Crear nuevo post y agregar titulo = 255 caracteres', () => { //  crear titulo priori pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(priori.postTitle255)
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E08-Crear nuevo post y agregar titulo > 255 caracteres', () => { //  crear titulo priori pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(priori.postTitle256)
            cy.get('button.post-settings').click()
            ghost.goPosts()
            cy.get('.modal-header > h1')
                .should('contain', 'Are you sure you want to leave this page?')
        })

        it('E09-Editar titulo > 255 caracteres y publicar', () => { //  crear titulo priori pool
            ghost.goPosts()
            ghost.selectLastedPost()
            cy.get('.gh-editor-title').clear()
            cy.get('.gh-editor-title').type(priori.postTitle256)

            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-red')
            cy.get('article.gh-alert')
                .should('have.class', 'gh-alert-red')
        })

        it('E10-Editar titulo < 255 caracteres y publicar', () => { //  crear titulo aleatorio
            ghost.goPosts()
            ghost.selectLastedPost()
            cy.get('.gh-editor-title').invoke('val')
                .then(val => {
                    const oldTitle = val
                    cy.get('.gh-editor-title').clear()
                    cy.get('.gh-editor-title').type(faker.name.title()).invoke('val')
                        .then(val => {
                            const title = val
                        }).should('be.not.eq', oldTitle)
                })
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E11-Editar titulo y validar slug de Post', () => { // crear titulo aleatorio
            ghost.goPosts()
            ghost.selectLastedPost()
            cy.get('.gh-editor-title').clear()
            cy.get('.gh-editor-title').type(faker.name.title()).invoke('val')
                .then(val => {
                    const desiredSlug = val.toLowerCase().replace(/\s+/g, "-")
                    console.log(desiredSlug)
                    
                    cy.get('button.post-settings').click()
                    cy.get('input.post-setting-slug').invoke('val')
                        .then(val => {
                            const slug = val
                        }).should('be.not.eq', desiredSlug)
                })
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E12-Validar slug de Post', () => { // crear titulo aleatorio
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            cy.get('.gh-editor-title').invoke('val')
                .then(val => {
                    const desiredSlug = val.toLowerCase().replace(/\s+/g, "-")
                    console.log(desiredSlug)
                    
                    cy.get('button.post-settings').click()
                    cy.get('input.post-setting-slug').invoke('val')
                        .then(val => {
                            const slug = val
                            console.log('slug: ' + slug)
                        }).should('be.eq', desiredSlug)
                })
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')            
        })
    })

    context('Post tags', () => {

        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })

        it('E13-Agregar tag nueva > 191 caracteres', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(priori.postTitle254).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-red')
            cy.get('article.gh-alert')
                .should('have.class', 'gh-alert-red')            
        })

        it('E14-Agregar tag nueva < 191 caracteres', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(pseudo[random].tag).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E15-Agregar tag nueva = 191 caracteres', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(priori.postTag191).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green') 
        })

        it('E16-Agregar tag solo numeros', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(faker.datatype.float()).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
        it('E17-Agregar tag con caracteres especiales', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(faker.datatype.string()).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
        it('E18-Agregar tag de prueba', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(priori.postTag).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
        it('E19-Agregar tag que ya existe', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#tag-input').type(priori.postTag).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
    })

    context('Post excerpt', () => {

        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })

        it('E20-Agregar excerpt > 300 caracteres', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#custom-excerpt').type(priori.postExcerpt301).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-red')
            cy.get('article.gh-alert')
                .should('have.class', 'gh-alert-red')            
        })

        it('E21-Agregar excerpt = 300 caracteres', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#custom-excerpt').type(priori.postExcerpt300).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-red')
            cy.get('article.gh-alert')
                .should('have.class', 'gh-alert-red')
        })

        it('E22-Agregar excerpt < 300 caracteres', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#custom-excerpt').type(pseudo[random].excerpt).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green') 
        })

        it('E23-Agregar excerpt solo numeros', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#custom-excerpt').type(faker.datatype.float()).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
        it('E24-Agregar excerpt con caracteres especiales', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('#custom-excerpt').type(faker.datatype.string()).type('{enter}')
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
    })

    context('Post metadata', () => {

        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })

        it('E25-Agregar metatitle > 70 caracteres', () => {
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            ghost.addMetadata()
            cy.get('#meta-title').type(priori.postMetaTitle71).type('{enter}')
            cy.get('button.back').click()
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')      
        })

        it('E26-Agregar metatitle = 70 caracteres', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            ghost.addMetadata()
            cy.get('#meta-title').type(priori.postMetaTitle).type('{enter}')
            cy.get('button.back').click()
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green') 
        })

        it('E27-Agregar metatitle < 70 caracteres', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            ghost.addMetadata()
            cy.get('#meta-title').type(faker.name.title()).type('{enter}')
            cy.get('button.back').click()
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green') 
        })

        it('E28-Agregar metatitle solo numeros', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            ghost.addMetadata()
            cy.get('#meta-title').type(faker.datatype.float()).type('{enter}')
            cy.get('button.back').click()
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
        it('E29-Agregar metatitle con caracteres especiales', () => {
            ghost.createDraftPost()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.openPostSettings()
            ghost.addMetadata()
            cy.get('#meta-title').type(faker.datatype.string()).type('{enter}')
            cy.get('button.back').click()
            cy.get('button.close').click()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
    })
    
    context('Post estatus', () => {
        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })

        it('E30-Cambiar el estado del Post a unpublished', () => {
            ghost.selectPublishedPost()
            ghost.changePostStatus()
            cy.get('footer.gh-publishmenu-footer button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })
    
        it('E31-Eliminar post', () => {
            ghost.selectLastedPost()
            ghost.openPostSettings()
            cy.get('button.settings-menu-delete-button').click()
            cy.get('div.modal-footer button.gh-btn-red > span').contains('Delete').click()
            cy.url({ timeout: 10000 })
                .should('contain', '/posts')
        })
        
    })
})    