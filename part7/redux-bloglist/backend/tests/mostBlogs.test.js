const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('author with most blogs', () => {
  test('when list has zero blogs, equals null', () => {
    expect(listHelper.mostBlogs(helper.listWithZeroBlogs)).toBe(null)
  })

  test('when list has only one blog, equals author of that blog', () => {
    expect(listHelper.mostBlogs(helper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has more than one blog, equals author with most blogs', () => {
    expect(listHelper.mostBlogs(helper.listWithManyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})
