const commentRouter = require('express').Router()

const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentRouter.get('/:id/comments', async (req,res) => {
  const comments = await Comment.find({blogs: req.params.id})
  res.json(comments)
})

commentRouter.post("/:id/comments", async (req, res) => {
  const body = req.body;
  const blog = await Blog.findById((req.params.id))

  const comment = new Comment({
    content: body.content,
    blogs: blog._id

  })
  if(body.content === undefined) {
    return res.status(400).end()
  }
  else{
    const saveComment = await comment.save()
    res.status(201).json(saveComment);
  }
})

module.exports = commentRouter;