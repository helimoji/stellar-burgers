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

  let i = 0;

  it('ingredient added to the constructor', () => {
    cy.contains(ingredientCard, 'Флюоресцентная булка R2-D3').within(() => {
      cy.get('button').click();
      i = i + 1;
    });

    cy.contains(ingredientCard, 'Хрустящие минеральные кольца').within(() => {
      cy.get('button').click();
      i = i + 1;
    });

    cy.contains(ingredientCard, 'Плоды Фалленианского дерева').within(() => {
      cy.get('button').click();
      i = i + 1;
    });

    cy.get(selectedIngredients)
      .find('.constructor-element')
      .should(($items) => {
        expect($items).to.have.length(i + 1);
      });
  });
  
  
  it('check order', () => {
      cy.contains(ingredientCard, 'Флюоресцентная булка R2-D3').within(() => {
          cy.get('button').click();
        });
        
        cy.contains(ingredientCard, 'Хрустящие минеральные кольца').within(() => {
            cy.get('button').click();
        });
        
        cy.contains(ingredientCard, 'Плоды Фалленианского дерева').within(() => {
            cy.get('button').click();
        });
        
        cy.contains('button', 'Оформить заказ').click();
        cy.wait(2000);
        cy.get(modal).should('exist');
        cy.get(modal).contains('12345').should('have.text', '12345');
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
    cy.contains(ingredientCard, 'Плоды Фалленианского дерева').click();
  });

  it('modal exist', () => {
    cy.get(modal).should('exist');
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
