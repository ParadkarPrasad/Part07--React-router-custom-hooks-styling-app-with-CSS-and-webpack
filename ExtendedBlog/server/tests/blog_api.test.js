const {test, after, beforeEach, describe }= require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async()=>{
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog=> blog.save())
  await Promise.all(promiseArray)

describe('4.8 GET request', ()=>{

  test('blogs are returned as json', async ()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async()=>{
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('4.9 Verify the id property', ()=>{
  test('blog are identified by id',async ()=>{
    const blog = await helper.BlogsInDb()
    assert.strictEqual(blog.id, blog._id)
  })
})

describe('4.10 A valid POST Request made', ()=>{
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  test('a valid blog is added', async ()=>{
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const blogAtEnd = await helper.BlogsInDb()
    assert.strictEqual(blogAtEnd.length , helper.initialBlogs.length+1)
  })
})

describe('4.11 POST without likes', ()=>{
  const newBlog={
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  }
  test('a post with no likes', async ()=>{

     await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)
    
    const blogAtEnd = await helper.BlogsInDb()
    const createdBlog = blogAtEnd.find(blog => blog.title === newBlog.title);
    const likes = createdBlog.likes !== undefined ? createdBlog.likes : 0;

    assert.strictEqual(likes, 0);
  })
})

describe('4.12 a blog missing few content', ()=>{
  test('a blog with missing url and title', async()=>{
    const newBlog = {
      likes: 5
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('4.13 deleting a single blog post', ()=> {
  test('a blog is deleted', async()=>{
    const BlogAtStart = await helper.BlogsInDb()
    const blogToDelete = BlogAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.BlogsInDb()
     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
   
  })
})
describe('4.14 Modify Blog', ()=>{

  test('Update a blog', async()=>{
    const blogAtStart = await helper.BlogsInDb()
    const blogtoUpdate = {...blogAtStart[0], likes:15}
    //console.log(blogtoUpdate)
    await api
    .put(`/api/blogs/${blogtoUpdate.id}`)
    .send(blogtoUpdate)
    .expect(200)

    const blogAfterModify = await helper.BlogsInDb()
    const modifiedBlog = blogAfterModify.find(blog=> blog.id === blogtoUpdate.id)
    assert.strictEqual(blogAfterModify[0].likes, 15)
   
    })
  })
})

describe('Users for testing', ()=>{

  beforeEach(async()=>{
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret',10)
    const user = new User({username: 'root', password:passwordHash})
    await user.save()
  })
  
  test('invalid users are not created', async()=>{
    const user = new User({
      username: "He",
      name: "John",
      password: "password123"
    })

    const usersAtStart = await helper.usersInDb()
    await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length , usersAtStart.length)
  })

})
after(async()=>{
  await mongoose.connection.close()
})