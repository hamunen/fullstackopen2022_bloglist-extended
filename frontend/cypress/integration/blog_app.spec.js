describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'testuser',
      name: 'Test User',
      password: 'testpw'
    })

    cy.visit('http://localhost:3000')
  })

  describe('login', function() {

    it('Login form is shown', function() {
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    it('user can login', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpw')
      cy.contains('login').click()

      cy.contains('Test User is logged in')
    })  

    it('login fails with wrong password', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong!')
      cy.contains('login').click()

      //tests that there is an 'error' class with certain styles!
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Test User is logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpw' })
    })
  
    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#titleInput').type('Test blog title')
      cy.get('#authorInput').type('Test author guy')
      cy.get('#urlInput').type('testurl.com')

      cy.get('#create-blog-button').click()
      cy.contains('Test blog title')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Test blog title',
          author: 'Test author guy',
          url: 'testurl.org'
        })
      })

      it('blog details can be viewed', function() {
        cy.contains('view').click()
        cy.contains('testurl.org')
        cy.contains('likes:')
      })

      it('blog details can be hidden', function() {
        cy.contains('view').click()
        cy.contains('hide').click()
        cy.get('html')
          .should('not.contain', 'testurl.org')
          .and('not.contain', 'likes:')
      })

      it('blog can be liked', function() {
       
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.get('[data-test-id="likeBtn"]').click()
        cy.contains('likes: 1')
        cy.get('[data-test-id="likeBtn"]').click()
        cy.contains('likes: 2')
      })

      it('blog can be deleted by the owner', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html')
          .should('contain', 'blog Test blog title deleted!')
          .and('not.contain', 'Test author guy')
      })

      it('blog can not be deleted by not owner', function() {
        cy.createUser({
          username: 'seconduser',
          name: 'Second User',
          password: 'testpw'
        })
        cy.login({ username: 'seconduser', password: 'testpw' })
        cy.contains('Test blog title')
        cy.contains('view').click()
        cy.get('[data-test-id="removeBtn"]').should('not.exist')
      })
    })

    describe('multiple blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Test 1',
          author: 'Test author',
          url: 'testurl.org',
          likes: 1
        })
        cy.createBlog({
          title: 'Test 2',
          author: 'Test author',
          url: 'testurl.org',
          likes: 2
        })
        cy.createBlog({
          title: 'Test 3',
          author: 'Test author',
          url: 'testurl.org',
          likes: 3
        })
      })

      it('blogs ordered by likes', function() {
        /*cy.get('div.blog').then(divs => {
          //console.log(divs[0].textContent)
          cy.wrap(divs[0]).should('contain', 'Test 3')
          cy.wrap(divs[1]).should('contain', 'Test 2')
          cy.wrap(divs[2]).should('contain', 'Test 1')
        })*/

        cy.get('div.blog').eq(0).should('contain', 'Test 3')
        cy.get('div.blog').eq(1).should('contain', 'Test 2')
        cy.get('div.blog').eq(2).should('contain', 'Test 1')

        cy.get('div.blog').eq(2) //.find('button')
          .contains('view').click()

        cy.get('div.blog').eq(2).contains('like')
          .click().click().click()

        cy.get('div.blog').eq(0).should('contain', 'Test 1')
        cy.get('div.blog').eq(1).should('contain', 'Test 3')
        cy.get('div.blog').eq(2).should('contain', 'Test 2')
      })

    })


  })
})


