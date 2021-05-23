import { GhostPost } from "../page-objects/ghost-posts";
const faker = require('faker');

describe('Posts', () => {

    const ghost = new GhostPost()
    const data = require('../fixtures/a-priori/post-data.json');

    context('Post title', () => {

        beforeEach(() => {
            ghost.login()
            cy.url({ timeout: 20000 }).should('contain', '/site')
            ghost.goPosts()
        })
        
        it.only('E01-Crear nuevo post y agregar titulo valido', () => { // crear titulo data pool
            ghost.postTitle()
            cy.get('.gh-editor-title').type(data.postTitle)
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

        it('E05-Crear nuevo post y agregar titulo que ya existe', () => { // crear titulo data pool
            ghost.postTitle()
            cy.fixture('a-priori/post-data').then((post) =>{
                cy.get('.gh-editor-title').type(post.postTitle)
            })
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })


        it('E06-Crear nuevo post y agregar titulo < 255 caracteres', () => { //  crear titulo data pool
            ghost.postTitle()
            cy.fixture('post-data').then((post) =>{
                cy.get('.gh-editor-title').type(post.postTitle254)
            })
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E07-Crear nuevo post y agregar titulo = 255 caracteres', () => { //  crear titulo data pool
            ghost.postTitle()
            cy.fixture('post-data').then((post) =>{
                cy.get('.gh-editor-title').type(post.postTitle255)
            })
            cy.get('button.post-settings').click()
            ghost.goPosts()
            ghost.selectLastedPost()
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-green')
        })

        it('E07-Crear nuevo post y agregar titulo > 255 caracteres', () => { //  crear titulo data pool
            ghost.postTitle()
            cy.fixture('post-data').then((post) =>{
                cy.get('.gh-editor-title').type(post.postTitle256)
            })
            cy.get('button.post-settings').click()
            ghost.goPosts()
            cy.get('.modal-header > h1')
                .should('contain', 'Are you sure you want to leave this page?')
        })

        it('E08-Editar titulo > 255 caracteres y publicar', () => { //  crear titulo data pool
            ghost.selectLastedPost()
            cy.get('.gh-editor-title').clear()
            cy.fixture('post-data').then((post) =>{
                cy.get('.gh-editor-title').type(post.postTitle256)
            })
            ghost.publishPost()
            cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
                .should('have.class', 'gh-btn-red')
            cy.get('article.gh-alert')
                .should('have.class', 'gh-alert-red')
        })

        it('E09-Ir a Poost validar slug' , () => { // crear titulo data pool
            ghost.goPosts()
            ghost.createDraftPost()
            cy.get('.gh-editor-title').invoke('val')
                .then(val => {
                    const desiredSlug = val.toLowerCase().replace(/\s+/g,"-")
                    console.log(desiredSlug)
                    
                    cy.get('button.post-settings').click()
                    cy.get('input.post-setting-slug').invoke('val')
                        .then(val => {
                            const slug = val
                            console.log('slug: ' + slug)
                        }).should('be.eq', desiredSlug)
                })
        })

    })

    it('E01-Crear nuevo post y publicar', () => {
        ghost.createDraftPost()
        ghost.goPosts()
        ghost.selectLastedPost()
        ghost.publishPost()
        cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
            .should('have.class', 'gh-btn-green')
     })
    

    it('E02-Editar titulo del Post', () => {
        ghost.selectLastedPost()
        cy.get('.gh-editor-title').clear()
        cy.get('.gh-editor-title').type('The title have been edited')
        ghost.publishPost()
        cy.get('div.gh-publishmenu-dropdown button.gh-publishmenu-button')
            .should('have.class', 'gh-btn-green')
        cy.get('.gh-editor-title')
            .should('have.value', 'The title have been edited')
    })

    it('E03-Cambiar el estado del Post a unpublished', () => {
        ghost.selectPublishedPost()
        ghost.changePostStatus()
        cy.get('footer.gh-publishmenu-footer button.gh-publishmenu-button')
            .should('have.class', 'gh-btn-green')
    })

    it('E04-Eliminar post', () => {
        ghost.selectLastedPost()
        ghost.openPostSettings()
        cy.get('button.settings-menu-delete-button').click()
        cy.get('div.modal-footer button.gh-btn-red > span').contains('Delete').click()
        cy.url({ timeout: 10000 })
            .should('contain', '/posts')
    })
})