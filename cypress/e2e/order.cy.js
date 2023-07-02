
import searchPage from "../support/pages/SearchPage";
import user from '../fixtures/user.json';
import {faker} from '@faker-js/faker';
import {registrateUser, loginUser, orderProduct, findProductInAnySearchPage} from '../support/Helper';



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


describe('Order', () => {
  
  it('complete the order of Banana Juice (1000ml) ', () => {
    registrateUser(user);
    loginUser(user);
    orderProduct(user, ' Banana Juice (1000ml) ');
  })
  
  it('complete the order of several products Banana Juice (1000ml) and  Carrot Juice (1000ml) ', () => {
    registrateUser(user);
    loginUser(user);
    searchPage.addProductToBasket(' Carrot Juice (1000ml) ');
    orderProduct(user, ' Banana Juice (1000ml) ');
  })

  it('trying to find product that doesn`t exsist', () => {
    registrateUser(user);
    loginUser(user);
    findProductInAnySearchPage('lnm');
  })

})