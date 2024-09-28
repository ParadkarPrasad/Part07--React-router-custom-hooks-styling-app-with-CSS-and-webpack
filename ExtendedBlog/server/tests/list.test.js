const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { noBlogs, listWithOneBlog, blogs } = require('./blog_post')
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has no blogs, equals 0', ()=>{
    const result = listHelper.totalLikes(noBlogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 10)
  })

  test('when a big list of blogs to be calculated', () => {
  
    const result = listHelper.totalLikes(blogs)
    assert.equal(result, 36)
  })
})

describe('favourite blog', ()=>{

  test('when list of blog is empty', ()=>{
    const result = listHelper.favoriteBlog(noBlogs)
    assert.deepStrictEqual(result,{})
  })

  test('when list has one blog, equals to that blog', ()=>{
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const favourite ={
      title:'First class tests',
      author: 'Robert C. Martin',
      likes :10
    }
    assert.deepStrictEqual(result,favourite)
  })

  test('when list has many blogs', ()=>{
    const result = listHelper.favoriteBlog(blogs)
    const favourite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    assert.deepStrictEqual(result,favourite)
  })
})

describe('mostBlogs', ()=>{
  test('when list is empty, return empty object', ()=>{
    const result = listHelper.mostBlogs(noBlogs)
    assert.deepStrictEqual(result,{})
  })

  test('when list has only one blog, return blog count of 1', ()=>{
    const result = listHelper.mostBlogs(listWithOneBlog)

    const answer = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }
    assert.deepStrictEqual(answer,result)
  })

  test('of a bigger list is calculated right', ()=>{
    const result = listHelper.mostBlogs(blogs)

    const answer = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(answer,result)
  })
})

describe('most likes', ()=>{
  test('when list is empty, return empty object', ()=>{
    const result = listHelper.mostLikes(noBlogs)
    assert.deepStrictEqual(result,{})
  })

  test('when list has only one blog, return blog count of 1', ()=>{
    const result = listHelper.mostLikes(listWithOneBlog)

    const answer = {
      author: listWithOneBlog[0].author,
      likes:10
    }
    assert.deepStrictEqual(answer,result)
  })

  test('of a bigger list is calculated right ', ()=>{
    const result = listHelper.mostLikes(blogs)

    const answer = {
      author: 'Edsger W. Dijkstra',
      likes:17
    }
    assert.deepStrictEqual(answer,result)
  })
})