import { GhostPage } from '../page-objects/ghost-pages';
const faker = require('faker');
const ghostPage = new GhostPage();
const data_a_priori = require('../fixtures/a-priori/page-data.json');

describe('Pages TestCase', () => {

    it('E01 - Crear nuevo page con titulo valido', () => {
        ghostPage.login()
        ghostPage.accederAPages()
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_1.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E02 - Crear nuevo page con unicamente espacios', () => {
        ghostPage.login()
        ghostPage.accederAPages()
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_2.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E03 - Crear nuevo page sin titulo', () => {
        ghostPage.login()
        ghostPage.accederAPages()
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_3.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E04 - Crear nuevo page con numeros en el titulo', () => {
        ghostPage.login()
        ghostPage.accederAPages()
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_4.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E05 - Crear nuevo page con símbolos', () => {
        ghostPage.login()
        ghostPage.accederAPages()
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_5.titulo)
        cy.url().should('contain', '#/pages')
    })
})