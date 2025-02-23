/// <reference types="cypress" />

import { BUN_DROP_TARGET_TOP, INGREDIENT_DROP_TARGET, INGREDIENT_GROUP } from "./selectors";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
Cypress.Commands.add('addIngredient', (name: string) => {
  cy.get(INGREDIENT_GROUP).contains(name).trigger('dragstart');
  cy.get(INGREDIENT_DROP_TARGET).trigger('drop');
});

Cypress.Commands.add('addBun', (name) => {
  cy.get(INGREDIENT_GROUP).contains(name).should('be.visible').trigger('dragstart');
  cy.get(BUN_DROP_TARGET_TOP, { timeout: 5000 }).should('exist').trigger('drop', { force: true });
});
  
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }