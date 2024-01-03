import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { StyledButton } from './styles'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </StyledButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledButton onClick={toggleVisibility}>Cancel</StyledButton>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
