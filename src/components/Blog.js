import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { commentBlog, likeBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
  background-color: whitesmoke;
  font-weight: bold;
  padding: 2px;
  margin-left: 5px;
`
const Input = styled.input`
  background-color: lightgrey;
  height: 20px;
  font-size: large;
`
const Title = styled.h2`

`
const Subtitle = styled.h3`
  font-size: larger;
`

const Body = styled.div`
  background-color: darkgrey;
`
const ClickLink = styled(Link)`
  border: 3px;
  border-color: black;
  background-color: grey;
`

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const _addLike = () => {
    dispatch(likeBlog(blog))
  }

  const _addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <Body>
      <Title>{blog.title}</Title>
      <ClickLink to={blog.url}>{blog.url}</ClickLink>
      <p>{blog.likes} likes <Button onClick={_addLike}>like</Button><br></br>
      added by {blog.user.name}</p>
      <Subtitle>comments</Subtitle>
      <form onSubmit={_addComment}>
        <Input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <Button type='submit'>add comment</Button>
      </form>
      <ul>
        {blog.comments.map((c, index) => <li key={index}>{c}</li>)}
      </ul>
    </Body>
  )
}

export default Blog