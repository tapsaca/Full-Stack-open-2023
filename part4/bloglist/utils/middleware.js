const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    const messageParts = error.message.split(':')
    if (messageParts.length === 3) {
      return response.status(400).json({ error: messageParts[2].trim() })
    }
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  } else {
    return response.status(401).json({ error: 'invalid token' })
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  } else {
    return response.status(401).json({ error: 'invalid token' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}