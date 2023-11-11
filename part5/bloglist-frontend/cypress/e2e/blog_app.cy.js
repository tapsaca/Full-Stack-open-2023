describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login to BlogList')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.createUser({ name: 'Superuser', username: 'root', password: 'secret' })
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.createUser({ name: 'Superuser', username: 'root', password: 'secret' })
      cy.login({ username: 'root', password: 'secret' })
    })

    it('a blog can be created', function() {
      cy.contains('Add a new blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('URL')
      cy.contains('Save').click()
      cy.get('.notification')
        .should('contain', 'Blog \'Title\' added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Title, Author')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Title', author: 'Author', url: 'URL' })
      })

      it('user can like a blog', function() {
        cy.contains('View').click()
        cy.contains('0')
        cy.contains('Like').click()
        cy.contains('1')
      })
    })
  })
})