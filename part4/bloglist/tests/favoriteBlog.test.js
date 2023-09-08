const listHelper = require('../utils/list_helper')
const data = require('./blog_test_data')

describe('favorite blog', () => {
  test('when list has zero blogs, equals null', () => {
    expect(listHelper.favoriteBlog(data.listWithZeroBlogs)).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    expect(listHelper.favoriteBlog(data.listWithOneBlog))
      .toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
  })

  test('when list has more than one blog, equals the blog with most likes', () => {
    expect(listHelper.favoriteBlog(data.listWithManyBlogs))
      .toEqual({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      })
  })
})