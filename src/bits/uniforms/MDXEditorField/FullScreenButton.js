import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'

const FullScreenButton = ({ isFullScreen, setIsFullScreen }) => (
  <Button
    fullWidth={true}
    color={'default'}
    onClick={() => setIsFullScreen(!isFullScreen)}
    style={{ backgroundColor: '#fafafa' }}
  >
    {
      isFullScreen ?
        <FullscreenExit />
        :
        <Fullscreen />
    }
  </Button>
)

FullScreenButton.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  setIsFullScreen: PropTypes.func.isRequired,
}

export default FullScreenButton