const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('there are two blogs posts', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('one of the blog titles is React patterns', async () => {
  const response = await helper.blogsInDb()

  const titles = response.map(blog => blog.title)

  expect(titles).toContain('React patterns')
})

test('check if unique identifier is named id', async () => {
  const response = await helper.blogsInDb()

  const identifiers = response.map(blog => blog.id)

  expect(identifiers).toBeDefined()
})

test('can create blog post', async () => {
  let blogObject = new Blog(helper.newBlog)
  await blogObject.save()

  const response = await helper.blogsInDb()

  const contents = response.map(blog => blog.title)

  expect(response).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('First class tests')
})

test('check if likes property is missing', async () => {
  const blogMissingLikes = {
    _id: '5a422b891b54a676234d17fa',
    title: 'Foo Bar',
    author: 'John Doe',
    url: 'https://example.com'
  }

  await api
    .post('/api/blogs')
    .send(blogMissingLikes)
    .expect(201)
  
  const newestBlog = await api.get(`/api/blogs/${blogMissingLikes._id}`)

  expect(newestBlog.body.likes).toBe(0)
})

test('deleting a specific blog post', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const newBlogs = await helper.blogsInDb()

  expect(newBlogs).toHaveLength(blogs.length - 1)

  const contents = newBlogs.map(blog => blog.title)

  expect(contents).not.toContain(blogToDelete.title)
})

// test('modifying a specific blog post', async () => {
//   const blogs = await helper.blogsInDb()
//   const blogToModifyId = blogs[0].id

//   const modifiedBlog = {
//     title: 'Modified',
//     author: 'Modified Author',
//     url: 'https://google.com',
//     likes: 14
//   }

//   await api
//     .put(`/api/blogs/${blogToModifyId}`)
//     .expect(200)

//   const newBlogs = await helper.blogsInDb()
//   const contents = newBlogs.map()


// })

afterAll(() => {
  mongoose.connection.close()
})