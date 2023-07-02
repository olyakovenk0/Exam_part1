class BasketPage {
    visit(){
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/basket');
    }

    getCheckoutButton(){
       return cy.get('#checkoutButton');
    }
    
    checkout(){
        this.visit();
        this.getCheckoutButton().click();
        
        
    }

}

export default new BasketPage();