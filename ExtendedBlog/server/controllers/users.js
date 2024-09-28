const bcrypt = require('bcrypt');

const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async(request, response)=>{
  const users = await User.find({}).populate('blogs', {title: 1,
    author: 1,
    url: 1,})
  response.json(users)
})
usersRouter.post('/', async(request, response)=>{
  const {username, name, password} = request.body

  // Check username is unique Exercise 4.16
  const existingUser = await User.findOne({username})
  if(existingUser){
    return response.status(400).json({ error: "username should be unique"})
  }

  // Both username and password should be given
  if(!username || !password){
    return response.status(400).json({error: 'username or passoword is missing'})
  }

  // Username should be more than 3 characters
  if(username.length < 3){
    return response.status(400).json({error: 'username must be at least 3 characters long'})
  }

  // Password should be more than 3 characters
  if(password.length < 3){
    return response.status(400).json({error: 'password must be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter