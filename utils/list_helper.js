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

module.exports = {
  dummy,
  totalLikes
}