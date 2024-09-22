import { useDispatch } from 'react-redux'
import { notificationDisplay } from '../reducers/notificationReducer'
import { generateNewComment } from '../reducers/commentReducer'
import { useState } from 'react'

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const addNewComment = (event) => {
    event.preventDefault()
    dispatch(generateNewComment(id, comment))
    dispatch(notificationDisplay(`Comment added: ${ comment }`, 5))
    setComment('')
  }
  return (
    <>
      <form onSubmit={addNewComment}>
        <div>
          <input type="text" name="comment" value= {comment} onChange={({ target }) => setComment(target.value)}/>
          <button type="submit">add comment</button>
        </div>

      </form>
    </>
  )
}

export default CommentForm