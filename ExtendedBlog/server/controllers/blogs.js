const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

// const getTokenFrom = request =>{
//   const authorization = request.get('authorization')
//   if(authorization && authorization.startsWith('Bearer ')){
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogRouter.get('/',async (req,res) => {
 const blogs = await Blog.find({}).populate("comment").populate('user', {username: 1, name: 1,})
    res.json(blogs);
  })


  blogRouter.get('/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("comment")
    if(blog){
      res.json(blog)
    }
    else{
      res.status(404).end()
    }
  })
  blogRouter.post('/', middleware.userExtractor, async (request, response ,next)=> {
    const body = request.body
    const user = request.user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // console.log(request.token)
    // console.log(decodedToken)
    // if(!decodedToken.id){
    //   return response.status(401).json({error: 'invalid token or missing'})
    // }
  
    // const user = await User.findById(decodedToken.id)
    if(!body.title || !body.url){
      return response.status(400).end()
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
  //  console.log(savedBlog._id)
   await user.save()
   response.status(201).json(savedBlog)
    })
  
  blogRouter.delete('/:id', middleware.userExtractor, async(request,response)=>{
    const body = request.body
    const user = request.user
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if(!decodedToken.id){
    //   return response.status(401).json({error: 'invalid token or missing'})
    // }
    // const user = await User.findById(decodedToken.id)
    if(!user){
      return response.status(401).json({error: 'invalid user'})
    }
  
    const blog = await Blog.findById(request.params.id)
    // console.log(request.params.id)
    // console.log(blog)
    if(!blog){
      return response.status(404).json({ 
        error: 'blog not found',
      })
    }
    if (blog.user.toString() === user.id.toString()) {
      // console.log(blog.user.toString())
      // console.log(user.id.toString())
      // return response.status(401).json({ error: 'invalid token' });
      await Blog.findByIdAndDelete(request.params.id)
      // console.log(request.params.id)
      response.status(204).end()
    }
    
  })

  blogRouter.put('/:id', async(req,res)=>{
    const body = req.body

    const blog ={
      title: body.title,
      author:body.author,
      url: body.url,
      likes: body.likes
    }
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
    res.json(updateBlog).status(204)
  })
module.exports = blogRouter