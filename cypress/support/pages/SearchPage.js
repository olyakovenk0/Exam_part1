class SearchPage {
    visit(){
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/search');
    }

    findTheProduct(productName){
        return cy.contains(`${productName}`);
    }

    clickAddToBasketButtonOfProduct(productName){
        cy.log(`click add to basket for ${productName}`)
        this.findTheProduct(productName).parents('.mat-grid-tile-content').find('button').click({force: true});
    }

    addProductToBasket(productName){
        this.visit();
        this.clickAddToBasketButtonOfProduct(productName);
        cy.wait(500);
    }

    
    
    
}

export default new SearchPage();