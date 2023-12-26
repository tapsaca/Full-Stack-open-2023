const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {
  test('when list has zero blogs, equals 0', () => {
    expect(listHelper.totalLikes(helper.listWithZeroBlogs)).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)
  })

  test('when list has more than one blog, equals the sum of likes of all blogs', () => {
    expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
  })
})
