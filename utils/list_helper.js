const dummy = () => {
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

const authorInfo = (blogs) => {
  let authors = []
  let numberOfBlogsPerAuthor = []
  let numberOfLikesPerAuthor = []

  blogs.forEach(blog => {
    if(authors.includes(blog.author)) {
      const indexOfAuthor = authors.indexOf(blog.author)
      numberOfBlogsPerAuthor[indexOfAuthor] += 1
      numberOfLikesPerAuthor[indexOfAuthor] += blog.likes
    } else {
      authors.push(blog.author)
      numberOfBlogsPerAuthor.push(1)
      numberOfLikesPerAuthor.push(blog.likes)
    }
  })

  const authorsInformation = {
    authorNames: authors,
    authorsNumberOfBlogs: numberOfBlogsPerAuthor,
    authorsNumberOfLikes: numberOfLikesPerAuthor
  }

  return authorsInformation
}

const mostBlogs = (blogs) => {
  const authorsInformation = authorInfo(blogs)

  const indexOfAuthorWithMostBlogs = authorsInformation.authorsNumberOfBlogs.indexOf(Math.max(...authorsInformation.authorsNumberOfBlogs))
  
  const mostBlogsAuthor = {
    author: authorsInformation.authorNames[indexOfAuthorWithMostBlogs],
    blogs: authorsInformation.authorsNumberOfBlogs[indexOfAuthorWithMostBlogs] 
  }

  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const authorsInformtaion = authorInfo(blogs)

  const indexOfAuthorWithMostLikes = authorsInformtaion.authorsNumberOfLikes.indexOf(Math.max(...authorsInformtaion.authorsNumberOfLikes))

  const mostLikesAuthor = {
    author: authorsInformtaion.authorNames[indexOfAuthorWithMostLikes],
    likes: authorsInformtaion.authorsNumberOfLikes[indexOfAuthorWithMostLikes]
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