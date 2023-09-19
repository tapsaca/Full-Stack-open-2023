const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes
      ? favorite
      : blog
  }) 

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = _.countBy(blogs, 'author')
  const mostBlogs = _.max(Object.values(blogsByAuthor))

  return {
    author: _.find(Object.keys(blogsByAuthor), (author) => { return blogsByAuthor[author] === mostBlogs }),
    blogs: mostBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  
  const mostLiked = _
    .chain(blogs)
    .groupBy('author')
    .map((group) => {
      return {
        author: group[0].author,
        likes: _.sumBy(group, 'likes')
      }
    })
    .maxBy('likes')
    .value()

  return mostLiked
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0) 
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}