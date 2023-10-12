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
})

afterAll(async () => {
  await mongoose.connection.close()
})