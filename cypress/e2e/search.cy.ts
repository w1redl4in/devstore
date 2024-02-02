describe('search products', () => {
  it('should be able to search for products', () => {
    cy.visit('/')
    cy.get('input[name="query"]').type('camiseta{enter}')

    cy.url().should('include', '/search')
    cy.location('search').should('include', 'query=camiseta')

    cy.get('a[href^="/product"]').first().should('exist')
  })

  it('should not be able to search page without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
