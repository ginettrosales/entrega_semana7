import { GhostTag } from "../page-objects/ghost-tags";


const datosPriori = require('../fixtures/a-priori/tags-data.json');
const datosPseudo = require('../fixtures/pseudo/tag-data.json');
const faker = require('faker');

describe('Tags', () => {

    const ghost = new GhostTag()

    beforeEach(() => {
        ghost.login()
        cy.url({ timeout: 20000 }).should('contain', '/site')
        ghost.createTag()
        ghost.goTags()
        ghost.createTag(true)
        ghost.goTags()
      
    })
    

    it('E01-Editar tag con descripcion con mas caracteres 501', () => {
        let description = ''
        for (let i = 0; description.length < 501;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('#tag-description').next().should('contain', 'Description cannot')

    })
    it('E02-Editar tag con descripcion con igual caracteres 501', () => {
        let description = ''
        for (let i = 0; description.length < 500;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })
    it('E03-Editar tag con descripcion con menos caracteres 501', () => {
        let description = ''
        for (let i = 0; description.length < 499;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E04-Editar tag con nombre con mas caracteres 192', () => {
        let description = ''
        for (let i = 0; description.length < 192;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('#tag-name').next().should('contain', 'Tag names cannot')

    })

    it('E05-Editar tag con nombre con igual caracteres 191', () => {
        let description = ''
        for (let i = 0; description.length < 191;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E06-Editar tag con nombre con menos caracteres 190', () => {
        let description = ''
        for (let i = 0; description.length < 190;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E07-Editar tag con nombre sin caracteres 0', () => {
        let description = ' ' 
        ghost.selectTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })


    it('E08-Editar tag con slug con mas caracteres 192', () => {
        let description = ''
        for (let i = 0; description.length < 192;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })

    it('E09-Editar tag con slug con igual caracteres 191', () => {
        let description = ''
        for (let i = 0; description.length < 191;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E10-Editar tag con slug con menos caracteres 190', () => {
        let description = ''
        for (let i = 0; description.length < 190;i++) {
            description+=faker.lorem.word(1)
        }
            
        ghost.selectTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })


    it('E11-Editar tag con color con menos caracteres 6', () => {
        ghost.selectTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[1][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })

    it('E12-Editar tag con color con 0 caracteres', () => {
        ghost.selectTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(' ')
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })
    it('E13-Editar tag con color con caracteres invalidos', () => {
        ghost.selectTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[2][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })
    it('E14-Editar tag con color con caracteres correctos', () => {
        ghost.selectTag()
        var cont = faker.random.number(0,99)
        var color = datosPseudo[0][cont].color.substring(1,7)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })
    it('E15-Editar tag con color con color no existente', () => {
        ghost.selectTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[3][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })
    
    it('E16-Editar tag interno con color con menos caracteres 6', () => {
        ghost.selectInternalTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[1][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })

    it('E17-Editar tag interno con color con 0 caracteres', () => {
        ghost.selectInternalTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(' ')
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })
    it('E18-Editar tag interno con color con caracteres invalidos', () => {
        ghost.selectInternalTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[2][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })
    it('E19-Editar tag interno con color con caracteres correctos', () => {
        ghost.selectInternalTag()
        var cont = faker.random.number(0,99)
        var color = datosPseudo[0][cont].color.substring(1,7)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })
    it('E20-Editar tag interno con color con color no existente', () => {
        ghost.selectInternalTag()
        var cont = faker.random.number(0,99)
        cy.get('input[name="accent-color"]').clear()
        cy.get('input[name="accent-color"]').type(datosPseudo[3][cont].color)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })




    it('E21-Editar tag interno con descripcion con mas caracteres 501', () => {
         
        ghost.selectInternalTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(datosPriori[1].description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('#tag-description').next().should('contain', 'Description cannot')

    })
    it('E22-Editar tag interno con descripcion con igual caracteres 501', () => {
        
        ghost.selectInternalTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(datosPriori[2].description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })
    it('E23-Editar tag interno con descripcion con menos caracteres 501', () => {
         
        ghost.selectInternalTag()
        cy.get('#tag-description').clear()
        cy.get('#tag-description').type(datosPriori[3].description)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E24-Editar tag interno con nombre con mas caracteres 192', () => {
       
        ghost.selectInternalTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(datosPriori[1].name)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('#tag-name').next().should('contain', 'Tag names cannot')

    })

    it('E25-Editar tag interno con nombre con igual caracteres 191', () => {
       
        ghost.selectInternalTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(datosPriori[2].name)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E26-Editar tag interno con nombre con menos caracteres 190', () => {
   
        ghost.selectInternalTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(datosPriori[3].name)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E27-Editar tag interno con nombre sin caracteres 0', () => {
       
        ghost.selectInternalTag()
        cy.get('#tag-name').clear()
        cy.get('#tag-name').type(datosPriori[4].name)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })


    it('E28-Editar tag interno con slug con mas caracteres 192', () => {
   
        ghost.selectInternalTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(datosPriori[1].slug)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-red')

    })

    it('E29-Editar tag interno con slug con igual caracteres 191', () => {
   
        ghost.selectInternalTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(datosPriori[2].slug)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })

    it('E30-Editar tag interno con slug con menos caracteres 190', () => {
            
        ghost.selectInternalTag()
        cy.get('#tag-slug').clear()
        cy.get('#tag-slug').type(datosPriori[3].slug)
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-green')

    })



    

    
})