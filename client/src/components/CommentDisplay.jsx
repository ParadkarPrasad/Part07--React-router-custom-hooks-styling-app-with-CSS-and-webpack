import { useSelector } from 'react-redux'
import  CommentForm  from './CommentForm'

import React from 'react'

const CommentDisplay = ({ id }) => {
  const comments = useSelector((state) => state.comment)
  return (
    <div>
      <h3>Comments</h3>
      <CommentForm id ={id} />
      {
        comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))
      }
    </div>
  )
}

export default CommentDisplay