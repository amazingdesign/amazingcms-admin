import React from 'react'
import PropTypes from 'prop-types'

import { ControlledEditor } from '@monaco-editor/react'
import { connectField, filterDOMProps } from 'uniforms'
import { FormLabel } from '@material-ui/core'

const styles = {
  root: {
    margin: '1rem 0',
  },
}

const MonacoEditorField = ({
  onChange,
  label,
  name,
  value,
  ...otherProps
}) => {
  const stringify = typeof value === 'object'

  return (
    <div style={styles.root}>
      <FormLabel>{label}</FormLabel>
      <ControlledEditor
        width={'100%'}
        height={'400px'}
        language={'javascript'}
        theme={'vs-dark'}
        options={{ minimap: { enabled: false } }}
        value={stringify ? JSON.stringify(value) : value}
        name={name}
        onChange={(e, value) => onChange(stringify ? JSON.parse(value) : value)}
        {...filterDOMProps(otherProps)}
      />
    </div>
  )
}

MonacoEditorField.defaultProps = {}

MonacoEditorField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default connectField(MonacoEditorField, {
  ensureValue: false,
  includeInChain: false,
})