import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      name: 'name',
      username: 'username'
    }
  }

  const user = {
    name: 'name',
    username: 'username'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} user={user} updateBlog={mockHandler} />)
  })

  test('event handler function is called twice when like button is pressed twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('renders title and author but no URL or likes', () => {
    const text = screen.queryByText('title, author')
    expect(text).not.toBeNull()
    const url = screen.queryByText('url')
    expect(url).not.toBeVisible()
    const likes = screen.queryByText('0')
    expect(likes).not.toBeVisible()
  })

  test('renders URL and likes when button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const url = screen.queryByText('url')
    expect(url).toBeVisible()
    const likes = screen.queryByText('0')
    expect(likes).toBeVisible()
  })
})