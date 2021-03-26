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

const mostBlogs = (blogs) => {
  let authors = []
  let numberOfBlogsPerAuthor = []

  blogs.forEach(blog => {
    if(authors.includes(blog.author)) {
      const indexOfAuthor = authors.indexOf(blog.author)
      numberOfBlogsPerAuthor[indexOfAuthor] += 1
    } else {
      authors.push(blog.author)
      numberOfBlogsPerAuthor.push(1)
    }
  })

  const indexOfAuthorWithMostBlogs = numberOfBlogsPerAuthor.indexOf(Math.max(...numberOfBlogsPerAuthor))
  
  const mostBlogsAuthor = {
    author: authors[indexOfAuthorWithMostBlogs],
    blogs: numberOfBlogsPerAuthor[indexOfAuthorWithMostBlogs] 
  }

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  let authors = []
  let numberOfLikesPerAuthor = []

  blogs.forEach(blog => {
    if(authors.includes(blog.author)) {
      const indexOfAuthor = authors.indexOf(blog.author)
      numberOfLikesPerAuthor[indexOfAuthor] += blog.likes
    } else {
      authors.push(blog.author)
      numberOfLikesPerAuthor.push(blog.likes)
    }
  })

  const indexOfAuthorWithMostLikes = numberOfLikesPerAuthor.indexOf(Math.max(...numberOfLikesPerAuthor))

  const mostLikesAuthor = {
    author: authors[indexOfAuthorWithMostLikes],
    likes: numberOfLikesPerAuthor[indexOfAuthorWithMostLikes]
  }

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}