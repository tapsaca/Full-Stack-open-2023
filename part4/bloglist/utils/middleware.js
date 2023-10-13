const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    const messageParts = error.message.split(':')
    if (messageParts.length === 3) {
      return response.status(400).json({ error: messageParts[2].trim() })
    }
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  errorHandler
}