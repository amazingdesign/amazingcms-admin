import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import uuidv1 from 'uuid/v1'

import { connectField, filterDOMProps } from 'uniforms'
import { TextField } from '@material-ui/core'

function UUIDField({ onChange, value, label, ...otherProps }) {
  useEffect(() => {
    if (!value) {
      onChange(uuidv1())
    }
  }, [value])

  return (
    <TextField
      {...filterDOMProps(otherProps)}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={true}
    />
  )
}

UUIDField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default connectField(UUIDField)