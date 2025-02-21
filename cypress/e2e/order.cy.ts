beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('checkUserAuth');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));
  
    cy.visit('/');
  });
  
  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('accessToken');
  });

describe('Order', () => {
  before(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
  });

  it('Should create order', () => {
    cy.addIngredient('Флюоресцентная булка R2-D3');
    cy.addIngredient('Соус фирменный Space Sauce');
    cy.addIngredient('Сыр с астероидной плесенью');

    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-testid=order-number]').contains('69126').should('exist');
  });
});
