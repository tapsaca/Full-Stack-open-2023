const listHelper = require("../utils/list_helper")
const helper = require("./test_helper")

describe("favorite blog", () => {
  test("when list has zero blogs, equals null", () => {
    expect(listHelper.favoriteBlog(helper.listWithZeroBlogs)).toBe(null)
  })

  test("when list has only one blog, equals that blog", () => {
    expect(listHelper.favoriteBlog(helper.listWithOneBlog)).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    })
  })

  test("when list has more than one blog, equals the blog with most likes", () => {
    expect(listHelper.favoriteBlog(helper.listWithManyBlogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})
