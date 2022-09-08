import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  const blog = {
    title: 'something',
    author: 'somebody',
    url: 'somewhere.com',
    likes: 89,
    user: { name: 'Test User' }
  }

  test('renders content', () => {
    const view = render(
      <Blog blog={blog} handleLike={jest.fn()} handleDelete={jest.fn()} currentUser='x'/>
    )

    //view.debug()
    //const btn = view.container.querySelector('button')
    //console.log(prettyDOM(btn))

    expect(view.container).toHaveTextContent(blog.title)
    expect(view.container).toHaveTextContent(blog.author)
    expect(view.container).not.toHaveTextContent(blog.url)
    expect(view.container).not.toHaveTextContent(blog.likes)
    expect(view.container).not.toHaveTextContent(blog.user.name)

  })

  test('clicking view shows details and hide hides them', () => {
    const view = render(
      <Blog blog={blog} handleLike={jest.fn()} handleDelete={jest.fn()} currentUser='x'/>
    )

    // click view
    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    expect(view.container).toHaveTextContent(blog.title)
    expect(view.container).toHaveTextContent(blog.author)
    expect(view.container).toHaveTextContent(blog.url)
    expect(view.container).toHaveTextContent(blog.likes)
    expect(view.container).toHaveTextContent(blog.user.name)

    // click hide
    const hideButton = screen.getByText('hide')
    fireEvent.click(hideButton)

    expect(view.container).toHaveTextContent(blog.title)
    expect(view.container).toHaveTextContent(blog.author)
    expect(view.container).not.toHaveTextContent(blog.url)
    expect(view.container).not.toHaveTextContent(blog.likes)
    expect(view.container).not.toHaveTextContent(blog.user.name)
  })

  test('clicking like button calls the event handler', () => {
    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} handleLike={mockHandler} handleDelete={jest.fn()} currentUser='x'/>
    )

    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})