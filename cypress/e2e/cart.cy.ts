import { BUN_LAST_SELECTOR, BUN_FIRST_SELECTOR, CART_DROP_TARGET } from '../support/selectors';

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


  describe('Cart', () => {
    it('should add bun correctly', () => {
      cy.addIngredient('Краторная булка N-200i');
  
      cy.get(BUN_FIRST_SELECTOR, { timeout: 5000 })
        .should('exist')
        .contains('Краторная булка N-200i (верх)');
  
      cy.get(BUN_LAST_SELECTOR, { timeout: 5000 })
        .should('exist')
        .contains('Краторная булка N-200i (низ)');
    });
  
    it('should add ingredient correctly', () => {
      cy.addIngredient('Соус Spicy-X');
  
      cy.get(CART_DROP_TARGET, { timeout: 5000 })
        .should('exist')
        .contains('Соус Spicy-X');
    });
  });