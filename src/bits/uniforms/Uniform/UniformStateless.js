
import React from 'react'
import PropTypes from 'prop-types'

import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { AutoForm } from 'uniforms-material'
import DefaultSubmitField from '@bit/amazingdesign.react-redux-mui-starter.default-submit-field'

import { mapJSONSchemaToUniformsSchema } from '../mapJSONSchemaToUniformsSchema'
import { createValidator as defaultCreateValidator } from './defaultCreateValidator'

const UniformStateless = ({ schema, createValidator, submitLabel, ...otherProps }) => {
  if (!schema) return null

  const schemaMapped = mapJSONSchemaToUniformsSchema(schema)

  const schemaValidator = createValidator(schemaMapped)
  const bridge = new JSONSchemaBridge(schemaMapped, schemaValidator)

  return (
    <AutoForm
      schema={bridge}
      showInlineError={true}
      errorsField={() => null}
      submitField={() => <DefaultSubmitField label={submitLabel} />}
      {...otherProps}
    />
  )
}

UniformStateless.defaultProps = {
  createValidator: defaultCreateValidator,
}

UniformStateless.propTypes = {
  createValidator: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  submitLabel: PropTypes.string,
}

export default UniformStateless