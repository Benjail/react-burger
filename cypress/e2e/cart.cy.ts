import { BUN_DROP_TARGET_BOTTOM, BUN_DROP_TARGET_TOP, INGREDIENT_DROP_TARGET } from '../support/selectors';

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
    cy.addBun('Краторная булка N-200i');     
    
    cy.get(BUN_DROP_TARGET_TOP).contains('Краторная булка N-200i (верх)').should('exist');
    cy.get(BUN_DROP_TARGET_BOTTOM).contains('Краторная булка N-200i (низ)').should('exist');
    });
  
    it('should add ingredient correctly', () => {
      cy.addIngredient('Соус Spicy-X');
  
      cy.get(INGREDIENT_DROP_TARGET, { timeout: 5000 })
        .should('exist')
        .contains('Соус Spicy-X');
    });
  });