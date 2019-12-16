import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'

import Select from 'react-select'

const styles = {
  root: {
    margin: '0.25rem 0',
  },
  label: {
    fontSize: '0.875rem',
  },
}

const getValues = (array) => array && array.map(item => item.value)
const filterOptionsByValues = (options, values) => (
  values &&
  values.map(value => options.find(option => option.value === value))
)

function ReactSelectField({ onChange, value, label, options, labelComponent, ...otherProps }) {
  const Label = labelComponent || 'h4'
  return (
    <div style={styles.root}>
      <Label style={styles.label}>{label}</Label>
      <Select
        value={filterOptionsByValues(options, value)}
        onChange={(values) => onChange(getValues(values))}
        options={options}
        isSearchable={true}
        isMulti={true}
        {...otherProps}
      />
    </div>
  )
}

ReactSelectField.defaultProps = {
  label: 'Choose your photo',
}

ReactSelectField.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default connectField(ReactSelectField)