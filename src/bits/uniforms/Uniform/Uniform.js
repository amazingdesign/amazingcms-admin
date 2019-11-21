
import React from 'react'
import PropTypes from 'prop-types'

import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { AutoForm } from 'uniforms-material'

import { mapJSONSchemaToUniformsSchema } from '../mapJSONSchemaToUniformsSchema'
import { createValidator as defaultCreateValidator } from './defaultCreateValidator'

const Uniform = ({ schema, createValidator, ...otherProps }) => {
  if (!schema) return null

  const schemaMapped = mapJSONSchemaToUniformsSchema(schema)

  const schemaValidator = createValidator(schemaMapped)
  const bridge = new JSONSchemaBridge(schemaMapped, schemaValidator)

  return (
    <AutoForm
      schema={bridge}
      showInlineError={true}
      errorsField={() => null}
      {...otherProps}
    />
  )
}

Uniform.defaultProps = {
  createValidator: defaultCreateValidator,
}

Uniform.propTypes = {
  createValidator: PropTypes.func.isRequired,
  schema: PropTypes.object,
}

export default Uniform