const lodash = require('lodash')
const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) =>{
  return blogs.reduce((total, currentValue)=> total + currentValue.likes,0)
}

const favoriteBlog = (blogs) =>{
  if(blogs.length === 0){
    return {}
  }
  const topFav = blogs.reduce((prevBlog, currentBlog)=>{
    return currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog
  })
  return { title: topFav.title, author: topFav.author, likes: topFav.likes };
}

// Most blogs 
const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return {}
  }

  //Count the number of blogs by author 

  const blogCounts = lodash.countBy(blogs, 'author')
  console.log(blogCounts)

  // Find the author with the most blogs that
  const topAuthor = lodash.maxBy(lodash.keys(blogCounts), (author)=> blogCounts[author])

  return { 
    author: topAuthor,
    blogs: blogCounts[topAuthor]
  
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return { }
  }
  // Group the blogs by author
  const blogsByAuthor = lodash.groupBy(blogs, 'author')

  // Calculate the total likes for each author
  const likesByAuthor = lodash.mapValues(blogsByAuthor, (authorBlogs) => lodash.sumBy(authorBlogs, 'likes'))

  // Find the author with the most likes
  const topAuthor = lodash.maxBy(lodash.keys(likesByAuthor), (author) => likesByAuthor[author])

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}