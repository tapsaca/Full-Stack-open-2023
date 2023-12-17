const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = helper.listWithManyBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 10000)

describe("HTTP GET", () => {
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs have a property named id", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })
})

describe("HTTP POST", () => {
  let token

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "Superuser",
      password: "password",
    }
    await api.post("/api/users").send(user)
    const response = await api.post("/api/login").send(user)
    token = response.body.token
  })

  test("blog is correctly added to the database", async () => {
    const newBlog = {
      title: "Title",
      author: "Author",
      url: "http://url.com",
      likes: 1,
    }
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)
    const addedBlog = blogsAtEnd.find((blog) => blog.title === "Title")
    expect(addedBlog.id).toBeDefined()
    expect(addedBlog.author).toBe("Author")
    expect(addedBlog.url).toBe("http://url.com")
    expect(addedBlog.likes).toBe(1)
    expect(addedBlog.user).toBeDefined()
  })

  test("blog with missing likes property defaults to 0", async () => {
    const newBlog = {
      title: "No Likes",
      author: "Disliked",
      url: "http://meh.com",
    }
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    const addedBlog = blogsAtEnd.find((blog) => blog.title === "No Likes")
    expect(addedBlog.likes).toBe(0)
  })

  test("results in 401 if token is not provided", async () => {
    const newBlog = {
      title: "Title",
      author: "Author",
      url: "http://url.com",
      likes: 1,
    }
    await api.post("/api/blogs").send(newBlog).expect(401)
  })

  test("title missing results in bad request", async () => {
    const newBlog = {
      author: "Untitled",
      url: "http://untitled.com",
    }
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })

  test("url missing results in bad request", async () => {
    const newBlog = {
      title: "No URL",
      author: "Urless",
    }
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })
})

describe("HTTP DELETE", () => {
  let token

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "Superuser",
      password: "password",
    }
    await api.post("/api/users").send(user)
    const response = await api.post("/api/login").send(user)
    token = response.body.token
  })

  test("deleting a blog succeeds and results in 204 if id is valid", async () => {
    const newBlog = {
      title: "Title",
      author: "Author",
      url: "http://url.com",
      likes: 1,
    }
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToDelete = response.body
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      .set("Authorization", `bearer ${token}`)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(
      blogsAtEnd.find((blog) => blog.title === blogToDelete.title),
    ).not.toBeDefined()
  })
})

describe("HTTP PUT", () => {
  test("updating a blog succeeds", async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send({ ...blogsAtStart[0], likes: blogsAtStart[0].likes + 1 })
      .expect(200)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(
      blogsAtEnd.find((blog) => blog.id === blogsAtStart[0].id).likes,
    ).toBe(blogsAtStart[0].likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
