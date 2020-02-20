import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'

const ToggleEditorButton = ({ toggleEditor }) => (
  <Button
    fullWidth={true}
    color={'default'}
    onClick={toggleEditor}
    style={{ backgroundColor: '#fafafa' }}
  >
    <Edit />
  </Button>
)

ToggleEditorButton.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
}

export default ToggleEditorButton