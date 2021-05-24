//<reference types="cypress-xpath" />
const faker = require('faker');
const data = require('../fixtures/a-priori/staff-data.json');
const dato = require('../fixtures/pseudo/staff.json');
const n = faker.random.number({min:0, max:19});

describe('Staff', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl')+'ghost/#/signin');
        cy.get("input#ember8").type(Cypress.env('email'));
        cy.get("input#ember10").type(Cypress.env('pass')); 
        cy.get("button#ember12").click(); 
        cy.url({ timeout: 20000 }).should('contain', '/site')                
        
    })  
    
// Escenarios A-Priori

    it('E01-A-Priori Modificar locación del perfil ', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-location').clear({force: true});
        cy.get('#user-location').type(data[1].Jlocation, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');      
     
    })

    it('E02-A-Priori Modificar  website del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-website').clear({force: true});
        cy.get('#user-website').type(data[2].Jwebsite, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');
           
         
    })

    it('E03-A-Priori Modificar  user-facebook  del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-facebook').clear({force: true});
        cy.get('#user-facebook').type(data[8].JuserF, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');        
         
    })

    

    it('E04-A-Priori Invitar a un usuario', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff');
        cy.get("button.gh-btn.gh-btn-green").click();
        cy.get('#new-user-email').clear({force: true});
        cy.get('#new-user-email').type(data[0].Jemail);
        cy.get("div.modal-footer > button > span").click();
       
    })

    it('E05-A-Priori Modificar datos generales metadatos', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-first > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#metaDescription').clear({force: true});
        cy.get('#metaDescription').type(data[3].Jmeta, {force:true})
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
      
    })

    it('E06-A-Priori Modificar datos generales Titulo facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogTitle').clear({force: true});
        cy.get('#ogTitle').type(data[4].JtitleF, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

    it('E07-A-Priori Modificar datos generales Descripción facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogDescription').clear({force: true});
        cy.get('#ogDescription').type(data[5].JdescripF, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

    it('E08-A-Priori Modificar datos generales Titulo twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterTitle').clear({force: true});
        cy.get('#twitterTitle').type(data[6].JtitleT, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            

    })

    it('E09-A-Priori Modificar datos generales Descripción twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterDescription').clear({force: true});
        cy.get('#twitterDescription').type(data[7].JdescripT, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            

    })
    

// Escenarios Pseudo

    it('E01-Pseudo Modificar locación del perfil', function() { 

        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-location').clear({force: true});
        cy.get('#user-location').type(dato[1,n].Jlocation, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');
     
    })

    it('E02-Pseudo Modificar website del perfil', function() { 

        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-website').clear({force: true});
        cy.get('#user-website').type(dato[2,n].Jwebsite, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');
         
    })

    it('E03-Pseudo Modificar  user-facebook  del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-facebook').clear({force: true});
        cy.get('#user-facebook').type(dato[8].JuserF, {force:true});
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');        
         
    })

    it('E04-Pseudo Invitar a un usuario', function() { 

        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff');
        cy.get("button.gh-btn.gh-btn-green").click();
        cy.get('#new-user-email').clear({force: true});
        cy.get('#new-user-email').type(dato[0,n].Jemail);
        cy.get("div.modal-footer > button > span").click();
           
    })

    it('E05-Pseudo Modificar datos generales metadatos', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-first > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#metaDescription').clear({force: true});
        cy.get('#metaDescription').type(dato[3,n].Jmeta, {force:true})
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue'); 

    })

    it('E06-Pseudo Modificar datos generales Titulo facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogTitle').clear({force: true});
        cy.get('#ogTitle').type(dato[4,n].JtitleF, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
        
    })

    it('E07-Pseudo Modificar datos generales Descripción facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogDescription').clear({force: true});
        cy.get('#ogDescription').type(dato[5,n].JdescripF, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
        
    })

    it('E08-Pseudo Modificar datos generales Titulo twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterTitle').clear({force: true});
        cy.get('#twitterTitle').type(dato[6,n].JtitleT, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

    it('E09-Pseudo Modificar datos generales Descripción twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterDescription').clear({force: true});
        cy.get('#twitterDescription').type(dato[7,n].JdescripT, {force:true});
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

// Escenarios Faker

    it('E01-Faker Modificar locación del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-location').clear({force: true});
        cy.get('#user-location').type(faker.address.city());
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');       
     
    })

    it('E02-Faker Modificar website del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-website').clear({force: true});
        cy.get('#user-website').type(faker.internet.domainName());
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');           
         
    })

    it('E03-Faker Modificar user-facebook del perfil', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff/ghost');
        cy.get('#user-facebook').clear({force: true});
        cy.get('#user-facebook').type(faker.internet.domainName());
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');           
         
    })

    it('E04-Faker Invitar a un usuario', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/staff');
        cy.get("button.gh-btn.gh-btn-green").click();
        cy.get('#new-user-email').clear({force: true});
        cy.get('#new-user-email').type(faker.internet.email());
        cy.get("div.modal-footer > button > span").click();
           
    })

    

    it('E05-Faker Modificar datos generales metadatos', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-first > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#metaDescription').clear({force: true});
        cy.get('#metaDescription').type(faker.lorem.words())
        cy.get('section.view-actions > button').click({ force: true })
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
      
    })

    it('E06-Faker Modificar datos generales Titulo facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogTitle').clear({force: true});
        cy.get('#ogTitle').type(faker.company.companyName());
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

    it('E07-Faker Modificar datos generales Descripción facebook', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting-last > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#ogDescription').clear({force: true});
        cy.get('#ogDescription').type(faker.company.catchPhrase());
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })

    it('E08-Faker Modificar datos generales Titulo twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterTitle').clear({force: true});
        cy.get('#twitterTitle').type(faker.company.companyName());
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            

    })


    it('E09-Faker Modificar datos generales Descripción twitter', function() { 
        cy.visit(Cypress.env('baseUrl')+'ghost/#/settings/general/');
        cy.get(".gh-setting > .flex > .gh-setting-action > .gh-btn > span").click({force:true}); 
        cy.get('#twitterDescription').clear({force: true});
        cy.get('#twitterDescription').type(faker.company.catchPhrase());
        cy.get('section.view-actions > button').click({ force: true });
        cy.get('section.view-actions > button')
            .should('have.class', 'gh-btn-blue');            
    
    })





})
