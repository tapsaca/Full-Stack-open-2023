const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('HTTP GET', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('passwordHash is not defined', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].passwordHash).not.toBeDefined()
  })
})

describe('HTTP POST', () => {
  test('new user can be created', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'tapsaca',
      name: 'Tapio',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const addedUser = usersAtEnd.find(user => user.username === 'tapsaca')
    expect(addedUser.id).toBeDefined()
    expect(addedUser.username).toBe('tapsaca')
    expect(addedUser.name).toBe('Tapio')
  })

  test('results in 400 if password is missing', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'tapsaca',
      name: 'Tapio',
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(response.body.error).toBe('Password is required.')
  })

  test('results in 400 if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'tapsaca',
      name: 'Tapio',
      password: 'pa'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(response.body.error).toBe('Password must be at least 3 characters long.')
  })

  test('results in 400 if username is missing', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      name: 'Tapio',
      password: 'password'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(response.body.error).toBe('Username is required.')
  })

  test('results in 400 if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'ta',
      name: 'Tapio',
      password: 'password'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(response.body.error).toBe('Username must be at least 3 characters long.')
  })

  test('results in 400 if username is not unique', async () => {
    const usersAtStart = await helper.usersInDatabase()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(response.body.error).toBe('Username must be unique.')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})