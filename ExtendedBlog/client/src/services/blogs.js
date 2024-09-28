import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token =`Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config ={
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id,newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`,newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config={
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const getComment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createComment = async (id, content) => {
  const newCommentToAdd = { content, id:getId() }
  const response = await axios.post(`${baseUrl}/${id}/comments`, newCommentToAdd)
  return response.data
}
export default { getAll, setToken , create, update, deleteBlog, getComment,createComment }