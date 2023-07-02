import registrationPage from "./pages/RegistrationPage";
import loginPage from "./pages/LoginPage";
import homePage from "./pages/HomePage";
import searchPage from "./pages/SearchPage";
import basketPage from "./pages/BasketPage";
import {faker} from '@faker-js/faker';

export function submitAddressForm (user) {
    cy.log('submit address form');
    cy.get('.mat-focus-indicator.btn.btn-new-address.mat-button.mat-raised-button.mat-button-base.mat-primary').click();
    cy.get('#mat-input-7').type(user.country);
    cy.get('#mat-input-8').type(user.name);
    cy.get('#mat-input-9').type(user.mobileNumber);
    cy.get('#mat-input-10').type(user.zipCode);
    cy.get('#address').type(user.address);
    cy.get('#mat-input-12').type(user.city);
    cy.get('#mat-input-13').type(user.state);
    cy.get('#submitButton').click();
}

export function pickAnAddress(){
    cy.log('pick an address');
    cy.get('.mat-row.cdk-row.ng-star-inserted').last().click();
    cy.get('.mat-focus-indicator.btn.btn-next.mat-button.mat-raised-button.mat-button-base.mat-primary.ng-star-inserted').click();
}

export function chooseDeloverySpeed(){
    cy.log('choose delovery speed');
    cy.get('.mat-row.cdk-row.ng-star-inserted').first().click();
    cy.get('.mat-focus-indicator.btn.nextButton.mat-button.mat-raised-button.mat-button-base.mat-primary').click();
}

export function addNewCard(user){
    cy.log('add new card');
    cy.get('#mat-expansion-panel-header-0').click();
    cy.get('#mat-input-14').type(user.name);
    cy.get('#mat-input-15').type(user.cardNumber);
    cy.get('#mat-input-16').select(user.expiryMonth);
    cy.get('#mat-input-17').select(user.expiryYear.toString());
    cy.get('#submitButton').click();

}

export function choosePaymentOption(){
    cy.log('choose payment option');
    cy.get('.mat-radio-button.mat-accent').click();
    cy.get('.mat-focus-indicator.btn.nextButton.mat-button.mat-raised-button.mat-button-base.mat-primary').click();

}

export function placeOrderAndPay(){
    cy.log('place order and pay')
    cy.get('#checkoutButton').click();
}

export function confirmation(){
    cy.log('confirm that order is placed')
    cy.get('.confirmation').should('have.text', 'Thank you for your purchase!');
}

export function orderProduct(user, product){
    searchPage.addProductToBasket(product);
    basketPage.checkout();
    submitAddressForm(user);
    pickAnAddress();
    chooseDeloverySpeed();
    addNewCard(user);
    choosePaymentOption();
    placeOrderAndPay();
    confirmation();
}

export function registrateUser(user) {
    registrationPage.registrateUser(user.email, user.password);
}

export function loginUser(user){
    loginPage.authorize(user.email, user.password);
}

export function autorizationCheck(){
     homePage.authorizationCheck();
}

export function findIfProductExist(productName){
    let nameFound = false;
    cy.get('.item-name')
    .each(($itemName) => {
        const text = $itemName.text();
        if (text.includes(productName)) {
            nameFound = true;
        }
    })
    .then(() => {
        if (nameFound) {
      cy.log(`Found "${productName}"`);
        return true;
        } else {
      cy.log(`Product "${productName}" not found`);
      return false;
    }
  });

}

export function clickOnProduct(productName){
    cy.contains(productName).parents('.mat-grid-tile-content').find('button').click({force: true});
}

export function findProductInAnySearchPage(productName){
    cy.log('open all product list')
    cy.get('#mat-select-value-3').click();
    cy.get('.ng-tns-c130-19.ng-trigger.ng-trigger-transformPanel.mat-select-panel.mat-accent').children().last().click();
    cy.log(`looking for product ${productName}`)
    if(findIfProductExist(productName)){
        clickOnProduct(productName);
    } else {
        cy.log(`Product "${productName}" not found`);
        cy.fail(`Product "${productName}" not found`);
    }
 }

 export function solveTheCaptcha(){     
    const captchaValue = cy.get('#captcha')
    .then(($el) => {
        const text = $el.text();
        cy.log(text);
        let evalCapt = eval(`${text}`);
      console.log(evalCapt);
      cy.get('#captchaControl').type(evalCapt);
      console.log(text);
    })
}

export function addRating(){
    cy.log('pich thr rating')
    cy.get('#rating').type('{rightArrow}{rightArrow}{leftArrow}')
    
}

export function submitFeedbackForm() {
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/contact');
    cy.get('.cdk-overlay-backdrop.cdk-overlay-dark-backdrop.cdk-overlay-backdrop-showing').click();
    cy.get('.cc-compliance').click();
    cy.get('#comment').type(faker.lorem.sentence(7));
    addRating();
    solveTheCaptcha();
    cy.get('#submitButton').click();
    cy.log('check that feedback form is submited')
    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Thank you for your feedback.');
 }
    


