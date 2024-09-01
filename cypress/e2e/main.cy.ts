const ingredientCard = '[data-cy="ingredientCard"]';
const selectedIngredients = '[data-cy="selectedIngredients"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modalOverlay"]';

describe('constructor', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', JSON.stringify('fake'));
    cy.setCookie('accessToken', 'fake');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('ingredients have loaded', () => {
    cy.wait('@getIngredients').then(({ response }) => {
      if (response) expect(response.body.data).to.have.length(15);
    });
  });

  it('ingredient added to the constructor', () => {
    cy.get(selectedIngredients).should(
      'not.contain',
      'Флюоресцентная булка R2-D3'
    );
    cy.contains(ingredientCard, 'Флюоресцентная булка R2-D3').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.get(selectedIngredients).should('contain', 'Флюоресцентная булка R2-D3');

    cy.get(selectedIngredients).should(
      'not.contain',
      'Хрустящие минеральные кольца'
    );
    cy.contains(ingredientCard, 'Хрустящие минеральные кольца').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.get(selectedIngredients).should(
      'contain',
      'Хрустящие минеральные кольца'
    );

    cy.get(selectedIngredients).should(
      'not.contain',
      'Плоды Фалленианского дерева'
    );
    cy.contains(ingredientCard, 'Плоды Фалленианского дерева').within(() => {
      cy.contains('button', 'Добавить').click();
    });
    cy.get(selectedIngredients).should(
      'contain',
      'Плоды Фалленианского дерева'
    );
  });

  it('check order', () => {
    cy.contains(ingredientCard, 'Флюоресцентная булка R2-D3').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.contains(ingredientCard, 'Хрустящие минеральные кольца').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.contains(ingredientCard, 'Плоды Фалленианского дерева').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.get(modal).should('not.exist');
    cy.contains('button', 'Оформить заказ').click();
    cy.wait(5000);
    cy.get(modal).should('exist');
    cy.get(modal).find('h2').should('contain.text', '12345');
    cy.get(modal).find('svg').click();
    cy.get(modal).should('not.exist');
    cy.get(selectedIngredients)
      .find('.constructor-element')
      .should(($items) => {
        expect($items).to.have.length(0);
      });
  });
});

describe('modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(modal).should('not.exist');
    cy.contains(ingredientCard, 'Хрустящие минеральные кольца').click();
    });

  it('modal exist', () => {
    cy.wait(2000);
    cy.get(modal).should('exist');
    cy.get(modal).find('h3').should('contain.text', 'Хрустящие минеральные кольца');
  });

  it('close modal', () => {
    cy.get(modal).find('svg').click();
    cy.get(modal).should('not.exist');
  });

  it('close modal on overlay', () => {
    cy.get(modalOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});
