import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.class) {
    return null
  }

  return (
    <Wrapper className={notification.class}>{notification.message}</Wrapper>
  )
}

export default Notification

const Wrapper = styled.div`
  background: lightgrey;
  border: 1px solid;
  border-radius: 0.25em;
  color: ${(props) => (props.className === 'error' ? 'red' : 'green')};
  font-size: 20px;
  margin: 0.5em 0;
  padding: 0.5em;
`
