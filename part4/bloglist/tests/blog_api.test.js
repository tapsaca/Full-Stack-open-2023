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

afterAll(async () => {
  await mongoose.connection.close()
})