/* eslint-disable react/prop-types */
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { connectField, filterDOMProps } from 'uniforms'

const ListAdd = ({
  disabled,
  fullWidth,
  icon,
  margin,
  parent,
  value,
  variant,
  ...props
}) => {
  const limitNotReached =
    !disabled && !(parent.maxCount <= parent.value.length)

  return (
    <FormControl fullWidth={!!fullWidth} margin={margin} variant={variant}>
      <Button
        disabled={!limitNotReached}
        onClick={() =>
          limitNotReached &&
          parent.onChange(parent.value.concat([cloneDeep(value)]))
        }
        {...filterDOMProps(props)}
      >
        {icon}
      </Button>
    </FormControl>
  )
}

ListAdd.propTypes = {
  icon: PropTypes.node,
}

ListAdd.defaultProps = {
  fullWidth: true,
  icon: '+',
  margin: 'dense',
}

export default connectField(ListAdd, {
  includeParent: true,
  initialValue: false,
})