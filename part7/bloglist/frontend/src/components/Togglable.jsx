import PropTypes from "prop-types"
import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"

export default Togglable
