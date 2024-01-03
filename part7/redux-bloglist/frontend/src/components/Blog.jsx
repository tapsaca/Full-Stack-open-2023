import styled from 'styled-components'
import { StyledLink } from './styles'

const Blog = ({ blog }) => {
  return (
    <Wrapper>
      <StyledLink to={`/blogs/${blog.id}`}>
        {blog.title}, {blog.author}
      </StyledLink>
    </Wrapper>
  )
}

export default Blog

const Wrapper = styled.div`
  border: 1px solid;
  border-radius: 0.25em;
  margin: 0.5em;
  padding: 0.5em;
`
