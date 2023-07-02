class LoginPage {
    visit(){
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/login');
    }

    getEmailFild(){
        return cy.get('#email');
    }

    getPasswordFild(){
        return cy.get('#password');
    }

    clickLoginButton(){
        cy.get('#loginButton').click();
    }

    authorize(email, password){
        cy.log(`authorize user with ${email} and ${password}`)
        cy.log(`visit login page`)
        this.visit();
        cy.log(`pass email ${email}`)
        this.getEmailFild().type(email);
        cy.log(`pass password ${password}`)
        this.getPasswordFild().type(password);
        cy.log(`click login button`)
        this.clickLoginButton(); 
    } 

    
}

export default new LoginPage();