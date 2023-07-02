class RegistrationPage {
    visit(){
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/register');
        cy.get('.cc-compliance').click();
        cy.get('.mat-focus-indicator.close-dialog.mat-raised-button.mat-button-base.mat-primary.ng-star-inserted').click();
    }

    getEmailFild(){
        return cy.get('#emailControl');
    }  

    getPasswordFild(){
        return cy.get('#passwordControl');
    }

    getRepeatPasswordFild(){
        return cy.get('#repeatPasswordControl');
    }

    pickSecurityQuestionAndAnswer(){
        cy.get('#mat-select-value-1').click()
        cy.get('#mat-option-7').click();
        cy.get('#securityAnswerControl').type('Ninel');
    }

    clickRegistrationButton(){
        cy.get('#registerButton').click();
    }

    registrateUser(email, password){
        cy.log(`registrate user with email ${email} and password ${password}`)
        cy.log(`visit registration page`);
        this.visit();
        cy.log(`pass email ${email}`)
        this.getEmailFild().type(email);
        cy.log(`pass password ${password}`)
        this.getPasswordFild().type(password);
        cy.log(`pass repeat password ${password}`)
        this.getRepeatPasswordFild().type(password);
        cy.log(`pick security question and pass an answer`)
        this.pickSecurityQuestionAndAnswer();
        cy.log(`click registration button`);
        this.clickRegistrationButton();
    }
    
    
}

export default new RegistrationPage();