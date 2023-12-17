const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  if (!request.user) {
    return response.status(401).json({
      error: "invalid or missing token",
    })
  }
  const user = request.user
  blog.user = user.id
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!request.user) {
    return response.status(401).json({
      error: "invalid or missing token",
    })
  }
  const user = request.user
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id,
    )
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({
      error: "unauthorized action",
    })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, user } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true },
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
