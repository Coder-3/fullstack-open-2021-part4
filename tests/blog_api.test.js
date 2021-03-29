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
  let response = await helper.blogsInDb()

  const likes = response.map(blog => blog.likes)

  expect(likes).toBeDefined()
})

test('correct error if title and url are missing', async () => {
  const blogMissingTitleAndUrl = {
    _id: '5a422ba71b54a676234d17fb',
    author: 'Robert C. Martin',
    likes: 0,
    __v: 0
  }

  let blogObject = new Blog(blogMissingTitleAndUrl)
  await blogObject.save().expect(400)

  const resultingBlogs = await helper.blogsInDb()

  expect(resultingBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})