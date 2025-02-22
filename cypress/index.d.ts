export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(value: string): Chainable,
      addBun(value: string): Chainable,
    }
  }
}