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
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  }
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0) 
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}