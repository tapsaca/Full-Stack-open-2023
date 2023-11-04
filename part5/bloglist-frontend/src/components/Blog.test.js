import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but no URL or likes', () => {
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
  render(<Blog blog={blog} user={user} />)
  const text = screen.queryByText('title, author')
  expect(text).not.toBeNull()
  const url = screen.queryByText('url')
  expect(url).not.toBeVisible()
  const likes = screen.queryByText('0')
  expect(likes).not.toBeVisible()
})