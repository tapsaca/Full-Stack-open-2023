const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  }
  next()
}

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

module.exports = {
  tokenExtractor,
  errorHandler
}