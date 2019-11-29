import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const PreviewVisibleButton = ({ isPreviewVisible, setIsPreviewVisible }) => (
  <Button
    fullWidth={true}
    color={'default'}
    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
    style={{ backgroundColor: '#fafafa' }}
  >
    {
      isPreviewVisible ?
        <VisibilityOff />
        :
        <Visibility />
    }
  </Button>
)

PreviewVisibleButton.propTypes = {
  isPreviewVisible: PropTypes.bool.isRequired,
  setIsPreviewVisible: PropTypes.func.isRequired,
}

export default PreviewVisibleButton