import SearchPage from "./SearchPage";

class HomePage {
    visit(){
        cy.visit('http://juice-shop-sanitarskyi.herokuapp.com/#/');
        cy.get('.cdk-overlay-backdrop.cdk-overlay-dark-backdrop.cdk-overlay-backdrop-showing').click();
        cy.get('.cc-compliance').click();
    }

    clickLoginButton(){
        cy.log('click login button')
        cy.get('#navbarAccount').click();
        cy.get('#navbarLoginButton').click();
    }

    authorizationCheck(){
        cy.log('check if user is logged in')
        cy.get('#navbarAccount').click({force: true});
        cy.get('#navbarLogoutButton');
        cy.log('user is authorized');
        cy.get('#navbarAccount').click({force: true});
    }

    getBasketButton(){
        return cy.get('.mat-focus-indicator.buttons.mat-button.mat-button-base.ng-star-inserted');
    }


    
}

export default new HomePage();