import React from 'react'
import PropTypes from 'prop-types'

const BackgroundFieldWrapper = props => (
  <div
    style={{
      boxSizing: 'border-box',
      width: '100%',
      background: '#fafafa',
      borderRadius: 4,
      padding: 16,
      margin: '16px 0',
      ...props.style,
    }}
  >
    {props.children}
  </div>
)

BackgroundFieldWrapper.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
}

export default BackgroundFieldWrapper