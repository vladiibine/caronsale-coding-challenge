import { getGreeting } from '../support/app.po';

describe('car-on-sale', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to car-on-sale!');
  });
});
