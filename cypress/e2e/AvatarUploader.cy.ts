const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(window?.HTMLInputElement?.prototype, 'value')?.set;
describe('AvatarUploader spec', () => {
  it('uploads and crop a file', () => {
    cy.visit('/');
    cy.get('input[type=file]').selectFile('cypress/fixtures/cat.png', { force: true, action: 'drag-drop' });
    cy.get('img').should('be.visible');
    cy.wait(1000);

    cy.get('input[type="range"]').then(($range) => {
      const range = $range[0];
      nativeInputValueSetter?.call(range, 15);
      // @ts-ignore
      range.dispatchEvent(new Event('change', { value: 15, bubbles: true }));
    });
    cy.wait(1000);
    cy.get('input[type=range]').should('have.value', 15);

    cy.get('button.save-crop-button').click();
    cy.wait(1000);

    cy.get('img').should('be.visible');
    cy.get('span.initial-text.primary').should('be.visible');
    cy.get('span.initial-text.secondary').should('be.visible');
  });
})