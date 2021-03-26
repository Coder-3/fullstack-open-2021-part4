const dummy = (blog) => {
  return 1
}

const totalLikes = (blogPosts) => {
  let likes = 0

  blogPosts.forEach(blog => {
    likes += blog.likes
  })

  return likes
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let indexOfMostLikes = 0
  
  blogs.forEach((blog, index) => {
    if(blog.likes > mostLikes) {
      mostLikes = blog.likes
      indexOfMostLikes = index
    }
  })

  return blogs[indexOfMostLikes]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}