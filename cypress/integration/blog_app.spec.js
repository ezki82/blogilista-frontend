describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Tester',
      username: 'ttes',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('user can log in with proper credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('ttes')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('Test Tester logged in')
    })

    it('user cannot log in with false credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('ffalse')
      cy.get('#password').type('false123')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})