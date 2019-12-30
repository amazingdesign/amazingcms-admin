import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

const styles = {
  root: {
    margin: '0.5rem 0 0.25rem 0',
  },
  label: {
    fontSize: '0.875rem',
  },
}

const customStyles = (isError) => ({
  container: (base) => ({ ...base }),
  control: (base) => ({ ...base, backgroundColor: 'inherit', ...(isError ? { borderColor: 'red' } : {}) }),
  menu: (base) => ({ ...base, backgroundColor: 'white', zIndex: 20 }),
})

const emptyStringIfFalse = (value) => {
  return value || ''
}
const getValues = (values) => {
  if (Array.isArray(values)) {
    return values.map(item => emptyStringIfFalse(item && item.value))
  }
  return emptyStringIfFalse(values && values.value)
}
const filterOptionsByValues = (options, values) => {
  if (!values) return
  if (Array.isArray(values)) {
    return values.map(value => options.find(option => option.value === value))
  }
  return options.find(option => option.value === values)
}

const ReactSelectField = ({
  onChange,
  value,
  label,
  options,
  labelComponent,
  errorLabelComponent,
  field,
  isCreatable,
  disabled,
  error,
  errorMessage,
  errorColor,
  ...otherProps
}) => {
  const errorStyle = { color: errorColor || 'red' }

  const Label = labelComponent || 'h4'
  const ErrorLabel = errorLabelComponent || 'p'

  const SelectComponent = isCreatable ? CreatableSelect : Select

  return (
    <div style={styles.root}>
      <Label style={error ? { ...styles, label, ...errorStyle } : styles.label}>{label}</Label>
      <SelectComponent
        value={filterOptionsByValues(options, value)}
        onChange={(values) => onChange(getValues(values))}
        options={options}
        isSearchable={true}
        isClearable={true}
        isDisabled={disabled}
        isMulti={field.type === 'array'}
        styles={customStyles(error)}
        {...otherProps}
      />
      {errorMessage ? <ErrorLabel style={error ? errorStyle : {}} > {errorMessage}</ErrorLabel> : null}
    </div >
  )
}

ReactSelectField.defaultProps = {
  label: 'Choose your photo',
}

ReactSelectField.propTypes = {
  isCreatable: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  labelComponent: PropTypes.func,
  errorLabelComponent: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  label: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorColor: PropTypes.string,
}

export default connectField(ReactSelectField)