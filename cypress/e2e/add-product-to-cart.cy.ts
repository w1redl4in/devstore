describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be possible to navigate do the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.get('input[name="query"]').type('camiseta{enter}')

    cy.url().should('include', '/search')

    cy.get('a[href^="/product"]').first().click()
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Cart (1)').should('exist')
  })
})
