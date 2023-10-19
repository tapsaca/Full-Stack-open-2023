const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app