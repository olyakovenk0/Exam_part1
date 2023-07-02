import user from '../fixtures/user.json';
import {faker} from '@faker-js/faker';
import {registrateUser, loginUser, autorizationCheck} from '../support/Helper';


user.email = faker.internet.email();
user.password = faker.internet.password();
user.country = faker.location.country();
user.name = faker.person.firstName();
user.mobileNumber = faker.phone.number('#########');
user.zipCode = faker.location.zipCode('#####');
user.address = faker.location.street();
user.state = faker.location.state();
user.cardNumber = faker.finance.creditCardNumber('4444############');
user.expiryMonth = faker.number.int({min: 1, max: 12});
user.expiryYear = faker.number.int({min: 2080, max: 2099});


describe('Registration', () => {

  it('check if login page is open after registration', () => {
    registrateUser(user);
    cy.url().should('eq', 'https://juice-shop-sanitarskyi.herokuapp.com/#/login');
  })

  it('check if registrated user can autchorize', () => {
    registrateUser(user);
    loginUser(user);
    autorizationCheck();
  })
  
})