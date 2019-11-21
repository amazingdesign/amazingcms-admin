import React from 'react'
import PropTypes from 'prop-types'

import { Button as MUIButton } from '@material-ui/core'

const styles = {
  button: {
    marginBottom: '2rem',
  },
}

const Button = (props) => (
  <MUIButton
    style={styles.button}
    variant={'contained'}
    color={'primary'}
    fullWidth={true}
    {...props}
  >
    {props.children || props.label}
  </MUIButton>
)

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
}

export default Button