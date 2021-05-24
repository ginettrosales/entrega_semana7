import { GhostPost } from "../page-objects/ghost-post";

describe('Login', () => {

    const ghost = new GhostPost()

    it("E01-Ingresar credenciales incorrectas", () => {
        ghost.loginIncorrecto();       
    });

    it('E02-Iniciar sesión correctamente', () => {
        ghost.login()
    })
    
    it('E03-Ingresar solo usuario', () => {
        ghost.loginUserOnly()
        cy.get('p.main-error').should('contain', 'Please fill')

    })
})