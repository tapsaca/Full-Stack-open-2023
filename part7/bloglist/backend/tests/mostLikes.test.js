const listHelper = require("../utils/list_helper")
const helper = require("./test_helper")

describe("author with most likes", () => {
  test("when list has zero blogs, equals null", () => {
    expect(listHelper.mostLikes(helper.listWithZeroBlogs)).toBe(null)
  })

  test("when list has only one blog, equals author of that blog", () => {
    expect(listHelper.mostLikes(helper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    })
  })

  test("when list has more than one blog, equals author with most likes", () => {
    expect(listHelper.mostLikes(helper.listWithManyBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})
