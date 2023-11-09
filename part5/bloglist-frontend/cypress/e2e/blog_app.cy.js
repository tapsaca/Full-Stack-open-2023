describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to BlogList')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    beforeEach(function() {
      const user = {
        name: 'Superuser',
        username: 'root',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('User: Superuser')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Login failed')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Hello Superuser')
    })
  })
})