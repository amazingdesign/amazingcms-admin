import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'


const DefaultSubmitField = (props) => {
  return (
    <Button
      style={{ margin: '1rem 0' }}
      type={'submit'}
      variant={'contained'}
      color={'primary'}
      fullWidth={true}
      {...props}
    >
      {props.label}
    </Button>
  )
}

DefaultSubmitField.defaultProps = {
  label: 'Submit',
}

DefaultSubmitField.propTypes = {
  label: PropTypes.string.isRequired,
}

export default DefaultSubmitField