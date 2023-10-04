const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.listWithManyBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('HTTP GET', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)
  
  test('blogs have a property named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP POST', () => {
  test('blog is correctly added to the database', async () => {
    const newBlog = {
      title: 'Title',
      author: 'Author',
      url: 'http://url.com',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Title')
    expect(addedBlog.id).toBeDefined()
    expect(addedBlog.author).toBe('Author')
    expect(addedBlog.url).toBe('http://url.com')
    expect(addedBlog.likes).toBe(1)
  })

  test('blog with missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'No Likes',
      author: 'Disliked',
      url: 'http://meh.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDatabase()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'No Likes')
    expect(addedBlog.likes).toBe(0)
  })

  test('title missing results in bad request', async () => {
    const newBlog = {
      author: 'Untitled',
      url: 'http://untitled.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('url missing results in bad request', async () => {
    const newBlog = {
      title: 'No URL',
      author: 'Urless'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})