import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledButton = styled.button`
  background: #eea47f;
  border: 1px solid;
  border-radius: 0.25em;
  color: #000000;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.5em;
`

export const StyledForm = styled.form`
  background: #815854;
  color: #f9ebde;
  padding: 0.5em;
`

export const StyledInput = styled.input`
  display: block;
  margin: 0.25em;
`

export const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`
