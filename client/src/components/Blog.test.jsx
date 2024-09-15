import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { test } from 'vitest'


const blog = {
  title: 'title',
  author: 'Testing',
  url: 'http://test.com',
  likes:10,
  user:{
    username:'testuser',
    name: 'test name'
  }
}

// Btn click
const likesmockHandler = vi.fn()
test('5.13 renders only title and author from the blog', () => {
  render(<Blog blog={blog}  />)
  expect(screen.getByText(blog.title)).toBeDefined()
  expect(screen.getByText(blog.author)).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText('likes')).toBeNull()
})

test('5.14 url and likes are displayed when button is clicked', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} updateLikes={likesmockHandler} />)
  const btn = screen.getByTestId('toggle-visibility')
  expect(btn).toHaveTextContent('view')
  await user.click(btn)

  expect(screen.getByText(blog.url)).toBeDefined()
  const ele = screen.getByTestId('blog-details')
  expect(ele).toHaveTextContent(`likes ${blog.likes}`)
  expect(btn).toHaveTextContent('hide')

})

test('5.15 the event handler that the component received as props is called twice', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} updateLikes={likesmockHandler} />)
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('likes')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likesmockHandler.mock.calls).toHaveLength(2)
})

const saveBlog = vi.fn()
test('5.16 calls saveBlog with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  render(<BlogForm saveBlog={saveBlog} />)

  await user.type(screen.getByTestId('title-input'), 'New Blog Title')
  await user.type(screen.getByTestId('author-input'), 'New Blog Author')
  await user.type(screen.getByTestId('url-input'), 'http://newblogurl.com')

  await user.click(screen.getByTestId('create-button'))

  expect(saveBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'http://newblogurl.com'
  })

  expect(screen.getByTestId('title-input').value).toBe('')
  expect(screen.getByTestId('author-input').value).toBe('')
  expect(screen.getByTestId('url-input').value).toBe('')
})