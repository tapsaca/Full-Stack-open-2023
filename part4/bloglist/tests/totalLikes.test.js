const listHelper = require('../utils/list_helper')
const data = require('./blog_test_data')

describe('total likes', () => {
  test('when list has zero blogs, equals 0', () => {
    expect(listHelper.totalLikes(data.listWithZeroBlogs)).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(data.listWithOneBlog)).toBe(5)
  })

  test('when list has more than one blog, equals the sum of likes of all blogs', () => {
    expect(listHelper.totalLikes(data.listWithManyBlogs)).toBe(36)
  })
})