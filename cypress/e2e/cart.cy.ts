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
  
      cy.get('[data-testid="cart-item-bun"]:first', { timeout: 5000 })
        .should('exist')
        .contains('Краторная булка N-200i (верх)');
  
      cy.get('[data-testid="cart-item-bun"]:last', { timeout: 5000 })
        .should('exist')
        .contains('Краторная булка N-200i (низ)');
    });
  
    it('should add ingredient correctly', () => {
      cy.addIngredient('Соус Spicy-X');
  
      cy.get('[data-testid="cart-drop-target"]', { timeout: 5000 })
        .should('exist')
        .contains('Соус Spicy-X');
    });
  });
  
  