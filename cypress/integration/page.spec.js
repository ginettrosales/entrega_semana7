import { GhostPage } from '../page-objects/ghost-pages';
const faker = require('faker');
const ghostPage = new GhostPage();
const data_a_priori = require('../fixtures/a-priori/page-data.json');
const data_pseudo = require('../fixtures/pseudo/page.json');

describe('A-Priori - Crear Pages TestCase', () => {

    //Preparacion de datos
    beforeEach(() => {
        ghostPage.login()
        ghostPage.accederAPages()
    })

    afterEach(() => {
        ghostPage.eliminarPage()
    })

    //Pruebas a-priori
    it('E01 - Crear nuevo page con titulo valido', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_1.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E02 - Crear nuevo page con unicamente espacios', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_2.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E03 - Crear nuevo page con numeros en el titulo', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_4.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E04 - Crear nuevo page con símbolos', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_5.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E05 - Eliminar page valido existente', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_1.titulo)
        cy.url().should('contain', '#/pages')
    })

    it('E06 - Publicar page valido existente', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.publicarPage(data_a_priori.crear_post_1.titulo)
        cy.url().should('contain', '#/pages')
    })
/*
    it('E07 - Crear nuevo page sin titulo', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(data_a_priori.crear_post_3.titulo)
        cy.url().should('contain', '#/pages')
    })
*/
})

describe('Pseudo Aleatorias - Crear Tags TestCase', () => {

    //Preparacion de datos
    beforeEach(() => {
        ghostPage.login()
        ghostPage.accederAPages()
        ghostPage.crearNuevoPage(data_a_priori.crear_post_1.titulo)
    })

    afterEach(() => {
        ghostPage.eliminarPage()
    })

    //Pruebas pseudo aleatorias
    it('E08 - Insertar tags con texto', () => {
        ghostPage.insertarTag(data_a_priori.crear_post_5.titulo, data_pseudo[0].tag_1)
        cy.get('ol li p span', {timeout:2000}).first().should('contain', data_pseudo[0].tag_1)
    })

    it('E09 - Insertar tags con y sin texto', () => {
        ghostPage.insertarTag(data_a_priori.crear_post_5.titulo, data_pseudo[0].tag_1)
        cy.get('ol li p span', {timeout:2000}).first().should('contain', data_pseudo[0].tag_1)
        ghostPage.insertarTag(data_a_priori.crear_post_5.titulo, data_pseudo[1].tag_2)
    })

    it('E10 - Insertar tags con alfanuméricos', () => {
        ghostPage.insertarTag(data_a_priori.crear_post_5.titulo, data_pseudo[1].tag_3)
        cy.get('ol li p span', {timeout:2000}).first().should('contain', data_pseudo[1].tag_3)
    })

    it('E11 - Insertar tags con numeros positivos', () => {
        ghostPage.insertarTag(data_a_priori.crear_post_5.titulo, data_pseudo[0].tag_4)
        cy.get('ol li p span', {timeout:2000}).first().should('contain', data_pseudo[0].tag_4)
    })
})

describe('Aleatorias General Pages TestCase', () => {

    //Preparacion de datos
    beforeEach(() => {
        ghostPage.login()
        ghostPage.accederAPages()
    })

    afterEach(() => {
        ghostPage.eliminarPage()
    })

    //Pruebas aleatorias
    it('E10 - Crear Page con titulo aleatorio', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.name.firstName())
        cy.url().should('contain', '#/pages')
    })

    it('E11 - Crear Page con una sola letra aleatoria', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.random.alpha())
        cy.url().should('contain', '#/pages')
    })

    it('E12 - Crear Page con un solo numero aleatorio', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.random.number(9))
        cy.url().should('contain', '#/pages')
    })

    it('E13 - Crear Page con dos numeros aleatorios', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.random.number(99))
        cy.url().should('contain', '#/pages')
    })

    it('E14 - Crear Page con una serie aleatoria de numeros', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.time.recent().toString() + faker.time.recent().toString() + faker.time.recent().toString())
        cy.url().should('contain', '#/pages')
    })
    
    it('E15 - Crear Page con direcciones aleatorias', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.name.prefix() + faker.address.zipCode() + faker.address.zipCode() + faker.address.zipCode() + faker.address.zipCode() + faker.address.zipCode())
        cy.url().should('contain', '#/pages')
    })

    it('E16 - Crear Page con titulo largo aleatorio', () => {
        cy.url().should('contain', '#/pages')
        ghostPage.crearNuevoPage(faker.lorem.words(10))
        cy.url().should('contain', '#/pages')
    })

    it('E17 - Crear tag con palabra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.insertarTag(faker.lorem.word(), faker.lorem.word())
    })

    it('E18 - Crear tag con letra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.insertarTag(faker.random.alpha(), faker.random.alpha())
    })

    it('E19 - Crear tag con numero aleatorio', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.insertarTag(faker.random.number(9), faker.random.number(9))
    })

    it('E20 - Crear tag con numeros aleatorios', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.insertarTag(faker.address.zipCode(), faker.address.zipCode())
    })

    it('E21 - Crear tag con una serie aleatoria de numeros', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.insertarTag(faker.time.recent().toString() + faker.time.recent().toString() + faker.time.recent().toString())
    })

    it('E22 - Editar URL con una palabra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarUrl(faker.random.word(), faker.random.word())
    })

    it('E23 - Editar URL con letra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarUrl(faker.random.alpha(), faker.random.alpha())
    })

    it('E24 - Editar URL con numero aleatorio', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarUrl(faker.random.number(9), faker.random.number(9))
    })

    it('E25 - Editar URL con numeros aleatorios', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarUrl(faker.address.zipCode(), faker.address.zipCode())
    })

    it('E26 - Editar URL con una serie aleatoria de numeros', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarUrl(faker.time.recent().toString() + faker.time.recent().toString() + faker.time.recent().toString())
    })

    it('E22 - Editar Excerpt con una palabra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarExcerpt(faker.random.word(), faker.random.word())
    })

    it('E23 - Editar Excerpt con letra aleatoria', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarExcerpt(faker.random.alpha(), faker.random.alpha())
    })

    it('E24 - Editar Excerpt con numero aleatorio', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarExcerpt(faker.random.number(9), faker.random.number(9))
    })

    it('E25 - Editar Excerpt con numeros aleatorios', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarExcerpt(faker.address.zipCode(), faker.address.zipCode())
    })

    it('E26 - Editar Excerpt con una serie aleatoria de numeros', () => {
        ghostPage.crearNuevoPage(faker.lorem.word())
        ghostPage.editarExcerpt(faker.time.recent().toString() + faker.time.recent().toString() + faker.time.recent().toString())
    })
})

