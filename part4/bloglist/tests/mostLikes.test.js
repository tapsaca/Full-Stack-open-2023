const listHelper = require('../utils/list_helper')
const data = require('./blog_test_data')

describe('author with most likes', () => {
  test('when list has zero blogs, equals null', () => {
    expect(listHelper.mostLikes(data.listWithZeroBlogs)).toBe(null)
  })

  test('when list has only one blog, equals author of that blog', () => {
    expect(listHelper.mostLikes(data.listWithOneBlog))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
  })

  test('when list has more than one blog, equals author with most likes', () => {
    expect(listHelper.mostLikes(data.listWithManyBlogs))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
  })
})