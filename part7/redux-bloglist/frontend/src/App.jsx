import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <Page>
        <h1>Login to BlogList</h1>
        <Notification />
        <LoginForm />
      </Page>
    )
  }

  return (
    <Page>
      <Header>BlogList</Header>
      <NavBar />
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Page>
  )
}

export default App

const Header = styled.h1`
  margin-top: 0;
`

const Page = styled.div`
  background: #f9ebde;
  color: #815854;
  height: 100vh;
  padding: 1em;
`
