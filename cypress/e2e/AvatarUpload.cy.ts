const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(window?.HTMLInputElement?.prototype, 'value')?.set;
describe('AvatarUpload spec', () => {
  it('uploads and crop a file', () => {
    cy.visit('/');
    cy.get('input[type=file]').selectFile('cypress/fixtures/cat.png', { force: true, action: 'drag-drop' });
    cy.get('img').should('be.visible');

    cy.get('input[type="range"]').then(($range) => {
      const range = $range[0];
      nativeInputValueSetter?.call(range, 15);
      // @ts-ignore
      range.dispatchEvent(new Event('change', { value: 15, bubbles: true }));
    });
    cy.get('input[type=range]').should('have.value', 15);

    cy.get('button.save-crop-button').click();

    cy.get('img').should('be.visible');
    cy.get('div.initial-text.primary').should('be.visible');
    cy.get('div.initial-text.secondary').should('be.visible');
  });

  it('show error message when image is invalid', () => {
    cy.visit('/');
    cy.get('input[type=file]').selectFile('cypress/fixtures/invalid-image.png', { force: true, action: 'drag-drop' });
    cy.get('div.error-text').should('be.visible');
    cy.get('div.try-again-text').should('be.visible');
  });

  it('return to initial state when click on cancel button', () => {
    cy.visit('/');
    cy.get('input[type=file]').selectFile('cypress/fixtures/cat.png', { force: true, action: 'drag-drop' });
    cy.get('#close-icon').click();
    cy.get('div.initial-text.primary').should('be.visible');
    cy.get('div.initial-text.secondary').should('be.visible');
  });
})