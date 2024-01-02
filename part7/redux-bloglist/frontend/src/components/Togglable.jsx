import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from './styled'

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
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
