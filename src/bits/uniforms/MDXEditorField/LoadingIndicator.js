import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'

const style = {
  external: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 99,
  },
  internal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
}

const LoadingIndicator = ({ message }) => (
  <div style={style.external} >
    <div style={style.internal} >
      <CircularProgress
        size={80}
      />
      <br />
      <br />
      <div>{message}</div>
    </div>
  </div>
)

LoadingIndicator.propTypes = {
  message: PropTypes.string,
}

export default LoadingIndicator