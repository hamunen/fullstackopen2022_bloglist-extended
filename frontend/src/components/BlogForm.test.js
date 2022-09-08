import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
//import { prettyDOM } from '@testing-library/dom'

describe('<BlogForm />', () => {
  test('calls the event hndler with right details', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title', { exact: false })
    const authorInput = screen.getByLabelText('author', { exact: false })
    const urlInput = screen.getByLabelText('url', { exact: false })
    //console.log(prettyDOM(titleInput))

    fireEvent.change(titleInput, { target: { value: 'New title' } })
    fireEvent.change(authorInput, { target: { value: 'New author' } })
    fireEvent.change(urlInput, { target: { value: 'newurl.com' } })

    const submitBtn = screen.getByRole('button', { name: 'create' })

    fireEvent.click(submitBtn)
    //const form = view.container.querySelector('form')

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('New title')
    expect(createBlog.mock.calls[0][0].author).toBe('New author')
    expect(createBlog.mock.calls[0][0].url).toBe('newurl.com')
  })
})
