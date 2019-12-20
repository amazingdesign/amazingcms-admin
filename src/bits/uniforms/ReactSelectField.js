import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'

import Select from 'react-select'

const styles = {
  root: {
    margin: '0.5rem 0 0.25rem 0',
  },
  label: {
    fontSize: '0.875rem',
  },
}

const customStyles = {
  container: (base) => ({ ...base }),
  control: (base) => ({ ...base, backgroundColor: 'inherit' }),
  menu: (base) => ({ ...base, backgroundColor: 'white', zIndex: 20 }),
}

const getValues = (values) => {
  if (!values) return
  if (Array.isArray(values)) {
    return values.map(item => item.value)
  }
  return values.value
}
const filterOptionsByValues = (options, values) => {
  if (!values) return
  if (Array.isArray(values)) {
    return values.map(value => options.find(option => option.value === value))
  }
  return options.find(option => option.value === values)
}

function ReactSelectField({ onChange, value, label, options, labelComponent, multiple, field, ...otherProps }) {
  const Label = labelComponent || 'h4'

  return (
    <div style={styles.root}>
      <Label style={styles.label}>{label}</Label>
      <Select
        value={filterOptionsByValues(options, value)}
        onChange={(values) => onChange(getValues(values))}
        options={options}
        isSearchable={true}
        isMulti={field.type === 'array'}
        styles={customStyles}
        {...otherProps}
      />
    </div>
  )
}

ReactSelectField.defaultProps = {
  label: 'Choose your photo',
}

ReactSelectField.propTypes = {
  multiple: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  labelComponent: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
}

export default connectField(ReactSelectField)