import { MODAL, MODAL_CLOSE } from '../support/selectors';
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

describe('Modal', () => {
  beforeEach(() => {
    cy.get('[data-testid="ingredient-group"]').as('group');
  });

  it('Should be opened and closed correctly', () => {
    cy.get('@group').contains('Краторная булка N-200i').should('exist').click();
    cy.get(MODAL).should('exist');
    cy.get(MODAL_CLOSE).should('exist').click();
    cy.get(MODAL).should('not.exist');
  });

  it('URL and details should be correct', () => {
    cy.get('@group').contains('Краторная булка N-200i').should('exist').click();
    cy.url().should('contain', 'ingredient/643d69a5c3f7b9001cfa093c');

    cy.get(MODAL).should('contain.text', 'Детали ингредиента');
    cy.get(MODAL).should('contain.text', 'Краторная булка N-200i');
    cy.get(MODAL).should('contain.text', 'Калории,ккал');
    cy.get(MODAL).should('contain.text', '42'); 
    cy.get(MODAL).should('contain.text', 'Белки, г');
    cy.get(MODAL).should('contain.text', '8');
    cy.get(MODAL).should('contain.text', 'Жиры, г');
    cy.get(MODAL).should('contain.text', '2,4');
    cy.get(MODAL).should('contain.text', 'Углеводы, г');
    cy.get(MODAL).should('contain.text', '5,3');

  });
});
